# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
app = Flask(__name__, static_folder='./public', static_url_path='')

from gensim.models import KeyedVectors
model_dir = './vector/entity_vector.model.bin'
model = KeyedVectors.load_word2vec_format(model_dir, binary=True)

def popular(password):
	mediocre = ['qqww1122', 'hottie', '7777777', 'letmein', 'donald', 'master', '123qwe', 'qwerty123',
				'12345', '1234', 'admin', 'adobe123', '12345678', 'michael', 'hello', 'shadow', '1234567',
				'bailey', '1234567890', 'whatever', 'iloveyou', '123123', 'Dragon', 'qazwsx', '!@#$%^&*',
				'solo', 'trustno1', 'photoshop', 'ninja', 'princess', 'Qwertyuiop', '123456789', 'Iloveyou',
				'1q2w3e4r', 'Million2', 'login', 'football', 'access', 'charlie', 'starwars', '18atcskd2w',
				'3rjs1la7qe', 'monkey', 'picture1', '12345679', '123321', '1q2w3e', 'aaron431', '1111111',
				'freedom', '123', 'flower', 'senha', '1q2w3e4r5t', 'mustang', 'zaq1zaq1', 'ashley', 'zxcvbnm',
				'mynoob', 'azerty', 'google', 'batman', '555555', '696969', '000000', '1qaz2wsx', 'jesus',
				'Monkey', 'Football', '987654321', 'abc123', '123456', 'qwertyuiop', '121212', 'baseball',
				'dragon', 'superman', 'aa123456', 'loveme', 'password1', 'password', '654321', '888888',
				'666666', 'qwerty', 'sunshine', 'passw0rd', 'lovely', '111111', 'welcome']
	return password in mediocre


def possibility(password):
	number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
	upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
	symbol = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", "[", "]", "|", "\\", ":", ";", "'", '"', "<", ",", ">", ".", "?", "/"]
	result = 1
	for s in password:
		if s in number:
			result *= len(number)
		elif s in upper:
			result *= len(upper)
		elif s in lower:
			result *= len(lower)
		elif s in symbol:
			result *= len(symbol)
	return result


@app.route('/pass', methods=['GET'])
def api():
	password = request.args.get('p')
	if password:
		if len(password) > 4:
			if not popular(password):
				return jsonify({'status': 0, 'value': possibility(password)})
			else:
				return jsonify({'status': 1, 'value': 0})
		else:
			return jsonify({'status': 2, 'value': 0})
	else:
		return jsonify({'status': 3, 'value': 0})

def split(data):
	result = []
	if data != None:
		for word in data.split(','):
			result.append("[" + word + "]")
	return result


@app.route('/similar', methods=['GET'])
def similar():
	try:
		answer = "[]"
		positive_words = split(request.args.get('p'))
		negative_words = split(request.args.get('n'))

		if len(negative_words) == 0:
			answer = model.most_similar(positive=positive_words)
		else:
			answer = model.most_similar(positive=positive_words, negative=negative_words)
	finally:
		return jsonify(answer)

if __name__ == '__main__':
	app.run(host='0.0.0.0')
