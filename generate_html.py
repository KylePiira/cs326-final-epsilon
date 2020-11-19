from jinja2 import FileSystemLoader, Environment
import os

TEMPLATES_DIR = 'templates'
OUTPUT_DIR = 'html'

environment = Environment(loader=FileSystemLoader(TEMPLATES_DIR))

for root, dirs, files in os.walk(TEMPLATES_DIR):
	for name in dirs:
		path = os.path.join(root, name)[len(TEMPLATES_DIR) + 1:]
		if not os.path.exists(f'{OUTPUT_DIR}/{path}'):
			os.mkdir(f'{OUTPUT_DIR}/{path}')
	for name in files:
		path = os.path.join(root, name)[len(TEMPLATES_DIR) + 1:]
		template = environment.get_template(path)
		with open(f'{OUTPUT_DIR}/{path}', 'w+') as output:
			output.write(template.render())