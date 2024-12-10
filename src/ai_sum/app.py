# Execute it by:
#   streamlit run src/ai_sum/app.py

import streamlit as st
import streamlit.components.v1 as components
import requests
from rank_bm25 import BM25Okapi
import openai

import config_log as config_log

config, logger, CONFIG_PATH = config_log.setup_config_and_logging()
config.read(CONFIG_PATH)

GOOGLE_MAPS_API_KEY = config.get("Google", "api_key")
openai.api_key = config.get("OpenAI", "api_key")

# 輔助函數
def fetch_google_reviews(place_id):
    """抓取 Google Maps 的目標景點評論"""
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=reviews&key={GOOGLE_MAPS_API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        reviews = data.get("result", {}).get("reviews", [])
        return [review["text"] for review in reviews if "text" in review]
    else:
        st.error("無法取得評論，請確認 API Key 或 Place ID 是否正確。")
        return []

def rank_reviews_bm25(reviews, user_preferences):
    """使用 BM25 對評論進行排序"""
    tokenized_corpus = [review.split(" ") for review in reviews]
    bm25 = BM25Okapi(tokenized_corpus)
    tokenized_query = user_preferences.split(" ")
    scores = bm25.get_scores(tokenized_query)
    sorted_reviews = [review for _, review in sorted(zip(scores, reviews), reverse=True)]
    return sorted_reviews[:100]

def summarize_reviews(reviews):
    """使用 GPT-4 總結評論並生成推薦語"""
    prompt = (
        "以下是一些此景點的 Google Maps 用戶評論：\n" +
        "\n".join(reviews) +
        "\n請根據這些評論總結出推薦語，並用推薦程度標示為低、中或高。" +
        "輸出範例：\n這個景點xxx yyyyyyyy。" + 
        "\n推薦程度：高"
    )
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000
        )
        return response.choices[0].message['content']
    except Exception as e:
        st.error(f"生成推薦語失敗：{e}")
        return "無法生成推薦語。"

st.title("智能景點建議 Demo")

# 使用者個人資料輸入
st.sidebar.header("用戶資料建構")
age = st.sidebar.number_input("年齡", min_value=1, max_value=120, value=25)
gender = st.sidebar.selectbox("性別", ["男", "女", "其他"])
preferences = st.sidebar.text_input("偏好（例如：風景、歷史、美食）", "風景")

# 從 Query Params 取得 place_id（若有）
params = st.query_params
place_id = params.get("place_id", "")

# 使用者可確認的 Place ID 欄位
# place_id = st.text_input("選擇的景點 Place ID:", value=place_id)

st.header("選擇景點")
components.html(f"""
    <div id="map" style="height: 500px; width: 100%;"></div>
    <script async
        src="https://maps.googleapis.com/maps/api/js?key={GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap">
    </script>
    <script>
        let map;
        let infowindow;

        function initMap() {{
            map = new google.maps.Map(document.getElementById('map'), {{
                center: {{lat: 25.0330, lng: 121.5654}}, // 台北市中心
                zoom: 12
            }});

            infowindow = new google.maps.InfoWindow();

            map.addListener("click", (event) => {{
                if (event.placeId) {{
                    event.stop();
                    fetchPlaceDetails(event.placeId);
                }}
            }});
        }}

        function fetchPlaceDetails(placeId) {{
            const service = new google.maps.places.PlacesService(map);
            service.getDetails({{ placeId: placeId }}, (place, status) => {{
                if (status === google.maps.places.PlacesServiceStatus.OK) {{
                    infowindow.setContent("<b>" + place.name + "</b>");
                    infowindow.setPosition(place.geometry.location);
                    infowindow.open(map);

                    // 利用修改 URL Query Parameters 來同步 place_id
                    const url = new URL(window.parent.location);
                    url.searchParams.set('place_id', placeId);
                    window.parent.history.pushState({{}}, '', url);
                }}
            }});
        }}
    </script>
""", height=400)

if st.button("生成建議"):
    if not place_id:
        st.error("請點選地圖以選擇景點")
    else:
        st.write("正在抓取評論，請稍候...")
        reviews = fetch_google_reviews(place_id)
        if reviews:
            st.write("成功取得評論，正在進行篩選與重排序...")
            top_reviews = rank_reviews_bm25(reviews, preferences)
            top_20_reviews = top_reviews[:5]

            st.write("正在生成推薦語...")
            summary = summarize_reviews(top_20_reviews)

            st.subheader("Top 5 條評論")
            for idx, review in enumerate(top_20_reviews, 1):
                with st.expander(f"評論 {idx}"):
                    st.write(review)

            st.subheader("最終建議")
            st.write(summary)
        else:
            st.error("無法取得評論或無評論可用。")
