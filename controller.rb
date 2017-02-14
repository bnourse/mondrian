require_relative './functions.rb'
require 'sinatra'
require 'json'
require 'pry'

set :server, 'thin'

ms = MondrianServer.new

# options("/save") do
#   response.headers["Access-Control-Allow-Origin"] = "*"
#   response.headers["Access-Control-Allow-Methods"] = "POST"
# end

# post("/save") do 
# 	request.body.rewind
# 	@json = JSON.parse(request.body.read)
# 	ms.save(@json)
# end

options '/load' do
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Methods"] = "GET"
end

get("/load") do 
	@save_json = ms.load_save_json("hardcoded")
	erb :load
end
