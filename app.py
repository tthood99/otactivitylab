import streamlit as st
import google.generativeai as genai

st.set_page_config(page_title="OT Activity Grader", page_icon="🧶")

st.title("🧶 OT Activity Grader")
st.markdown("Enter a goal and context below. The AI will suggest how to downgrade, keep level, and upgrade the task.")

# Sidebar for API Key
with st.sidebar:
    api_key = st.text_input("Enter Google API Key", type="password")

col1, col2 = st.columns(2)
with col1:
    goal = st.text_area("Therapeutic Goal", placeholder="e.g., Improve dynamic standing balance...")
with col2:
    context = st.text_area("Patient Context", placeholder="e.g., 65yo retired carpenter...")

if st.button("Analyze Activity"):
    if not api_key:
        st.error("Please enter an API Key in the sidebar.")
    elif not goal or not context:
        st.warning("Please fill in both fields.")
    else:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        prompt = f"""
        You are an expert OT.
        Goal: {goal}
        Context: {context}
        Provide 3 graded interventions: DOWNGRADE, TARGET, UPGRADE.
        """
        
        with st.spinner("Analyzing..."):
            try:
                response = model.generate_content(prompt)
                st.markdown(response.text)
            except Exception as e:
                st.error(f"Error: {e}")
