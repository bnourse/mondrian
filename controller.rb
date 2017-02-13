require_relative './functions.rb'
require 'sinatra'
require 'json'
require 'pry'

ms = MondrianServer.new

options("/save") do
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Methods"] = "POST"
end

post("/save") do 
	request.body.rewind
	@json = JSON.parse(request.body.read)
	ms.save(@json)
end

# get("/save") do 
# 	puts request.body.read
# end
