from flask import Flask, flash, request, redirect, url_for, render_template, jsonify
import urllib.request
import os
import sys
# from Backend.utility.neat import calculate_score
from werkzeug.utils import secure_filename
import secrets

# Get the parent directory of the current script (flask/app.py)
current_directory = os.path.dirname(os.path.abspath(__file__))
# Add the 'utility' directory to the Python path
utility_directory = os.path.join(current_directory, '..', 'utility')
sys.path.append(utility_directory)
from neat import calculate_score


secret_key = secrets.token_hex(16)  # Generates a 32-character (16-byte) hex string
app = Flask(__name__)
 
UPLOAD_FOLDER = 'static/uploads/'

app.config['SECRET_KEY'] = secret_key
app.secret_key = "secret key123"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
 
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/hello')
def home():
    return 'Hello, World!'


@app.route('/', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No image selected for uploading')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        print('upload_image filename: ' + filename)
        flash('Image successfully uploaded and displayed below')
        return render_template('index.html', filename=filename)
    else:
        flash('Allowed image types are - png, jpg, jpeg, gif')
        return redirect(request.url)
 
@app.route('/display/<filename>')
def display_image(filename):
    print('display_image filename: ' + filename)
    return redirect(url_for('static', filename='uploads/' + filename), code=301)


@app.route('/score', methods=['POST'])
def upload_image_score():
    if 'current_file' not in request.files:
        flash('current_file not found')
        return redirect(request.url)
    
    if 'target_file' not in request.files:
        flash('target_file not found')
        return redirect(request.url)
    
    current_file = request.files['current_file']
    target_file = request.files['target_file']

    if current_file.filename == '' or  target_file.filename == '':
        flash('No image selected for uploading')
        return redirect(request.url)
    if target_file and allowed_file(target_file.filename) and current_file and allowed_file(current_file.filename):
        
        target_filename = secure_filename(target_file.filename)
        target_filename_path = os.path.join(UPLOAD_FOLDER, target_filename)
        target_file.save(target_filename_path)

        current_filename = secure_filename(current_file.filename)
        current_filename_path = os.path.join(UPLOAD_FOLDER, current_filename)
        current_file.save(current_filename_path)
        
        res = calculate_score(target_filename_path, current_filename_path)
        print("got res as",res)

        flash('Image successfully uploaded and displayed below')
        output_msg = "Image successfully uploaded at " +target_filename_path+" and " + current_filename_path
        return output_msg

    else:
        flash('Allowed image types are - png, jpg, jpeg, gif')
        return redirect(request.url)
    

@app.errorhandler(404)
def page_not_found(error):
    return jsonify({'error': 'Page not found'}), 404

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'error': 'Internal server error'}), 500



if __name__ == '__main__':
    app.run()




