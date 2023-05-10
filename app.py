from flask import Flask, request, jsonify
from pytube import YouTube

app = Flask(__name__)

@app.route('/download', methods=['POST'])
def download():
    try:
        video_url = request.json['url']
        youtube = YouTube(video_url)
        video = youtube.streams.get_highest_resolution()
        file_url = video.url
        return jsonify({'fileUrl': file_url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
