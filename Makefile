.PHONY: all
all: weather test

.PHONY: weather
weather: weather.js weather.min.js

weather.js:
	cp lib/weather.js $@

weather.min.js: weather.js
	node_modules/.bin/uglifyjs -o $@ $<

.PHONY: test

test:
	@./node_modules/.bin/mocha ./test/weather --recursive --reporter list
