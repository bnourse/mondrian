require_relative './functions.rb'
require 'sinatra'
require 'json'
require 'pry'

set :server, 'thin'

ms = MondrianServer.new

post("/save") do 
	request.body.rewind
	@json = JSON.parse(request.body.read)
	ms.save(@json)
end

get("/load") do 
	@save_json = ms.load_save_json(params["save"])
	erb :load
end

get ("/savelist") do
	@savelist = ms.get_savelist.to_json
	erb :savelist
end

get ("/") do
	erb :index
end
