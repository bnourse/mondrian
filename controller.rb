require_relative './functions.rb'
require 'sinatra'
require 'json'
require 'pry'

set :server, 'thin'

ms = MondrianServer.new

# before do
#    content_type :json    
#    headers 'Access-Control-Allow-Origin' => '*', 
#            'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
#            'Access-Control-Allow-Headers' => 'Content-Type'  
# end

# options("/save") do
# 	200
# end

post("/save") do 
	request.body.rewind
	@json = JSON.parse(request.body.read)
	ms.save(@json)
end

# options '/load' do
# 	200
# end

get("/load") do 
	@save_json = ms.load_save_json(params["save"])
	erb :load
end

# options("/savelist") do
# 	200
# end

get ("/savelist") do
	@savelist = ms.get_savelist.to_json
	erb :savelist
end

get ("/") do
	erb :index
end
