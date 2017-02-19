require_relative './functions.rb'
require 'sinatra'
require 'json'

set :server, 'thin'

ms = MondrianServer.new

post("/save") do 
	json = JSON.parse(request.body.read)
	ms.save(json)
end

get("/load") do 
	return ms.load_save_json(params["save"])
end

get ("/savelist") do
	return ms.get_savelist.to_json
end

get ("/") do
	erb :index
end
