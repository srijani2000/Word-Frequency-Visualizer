from flask import Flask, render_template, request, jsonify
import re
from collections import Counter
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_text():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text.strip():
            return jsonify({'error': 'Please enter some text to analyze'}), 400
        
        # Clean and split text into words
        words = re.findall(r'\b[a-zA-Z]+\b', text.lower())
        
        if not words:
            return jsonify({'error': 'No valid words found in the text'}), 400
        
        # Count word frequencies
        word_counts = Counter(words)
        
        # Get top 10 words for visualization
        top_words = word_counts.most_common(10)
        
        # Prepare data for response
        words_data = [{'word': word, 'count': count} for word, count in word_counts.items()]
        chart_data = [{'word': word, 'count': count} for word, count in top_words]
        
        return jsonify({
            'success': True,
            'total_words': len(words),
            'unique_words': len(word_counts),
            'words_data': words_data,
            'chart_data': chart_data
        })
        
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    # Simple configuration - works for both development and production
    app.run(host='0.0.0.0', port=5000, debug=True)
