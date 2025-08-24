# Word Frequency Visualizer

A beautiful and modern web application that analyzes text and visualizes word frequencies with interactive charts and tables.

## Features

- **Text Analysis**: Split text into words and count frequency of each unique word
- **Interactive Charts**: Beautiful bar chart and pie chart for top 10 most frequent words
- **Complete Table**: Detailed table showing all words with their frequencies and percentages
- **Statistics**: Summary statistics including total words, unique words, and more
- **Modern UI**: Attractive and responsive design with smooth animations
- **Real-time Analysis**: Instant results with loading indicators

## Screenshots

The application features:
- Gradient background with modern card-based layout
- Interactive charts using Chart.js
- Responsive design for mobile and desktop
- Beautiful color schemes and animations

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd word-frequency-visualizer
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## Usage

1. Enter or paste your text in the text area
2. Click "Analyze Text" button
3. View the results:
   - Statistics cards showing total words, unique words, etc.
   - Interactive bar chart of top 10 words
   - Interactive pie chart of top 10 words
   - Complete table with all words and their frequencies

## Project Structure

```
word-frequency-visualizer/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/
│   └── index.html        # Main HTML template
└── static/
    └── script.js         # JavaScript functionality
```

## Deployment to AWS EC2 (Simple Steps)

1. **Launch EC2 Instance**
   - Choose Amazon Linux 2 AMI
   - Select t2.micro (free tier)
   - Configure security group to allow HTTP (port 80) and SSH (port 22)

2. **Connect and setup**
   ```bash
   ssh -i your-key.pem ec2-user@your-instance-ip
   sudo yum update -y
   sudo yum install python3 python3-pip git -y
   ```

3. **Clone and run**
   ```bash
   git clone <your-repository-url>
   cd word-frequency-visualizer
   pip install -r requirements.txt
   python app.py
   ```

4. **Your app is now running on port 5000!**
   - Access via: `http://your-ec2-ip:5000`

## Testing

### Local Testing
1. Start the application: `python app.py`
2. Open browser to `http://localhost:5000`
3. Test with sample text:
   ```
   The quick brown fox jumps over the lazy dog. 
   This is a sample text for testing the word frequency analyzer. 
   The fox is quick and the dog is lazy.
   ```

### Expected Results
- Total Words: 20
- Unique Words: 12
- Top words should include: "the", "is", "fox", "dog", etc.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
