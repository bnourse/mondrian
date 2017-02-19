require "csv"
require "json"

class MondrianServer

	def initialize
		@cfm = CSVFileModifier.new
		@save_data = {}
		@load_data = {}
	end

	def save(data)
		timestamp = Time.now.to_i.to_s
		@cfm.add_row_to_file(data,timestamp)
	end

	def load_save_json(savename) 
		save_hash = @cfm.get_row_from_file(savename)
		return save_hash.to_json
	end

	def get_savelist
		savenames = @cfm.load_saves_hash.keys
		return savenames
	end

end

class CSVFileModifier
	def initialize
		@csv_filename = "mondrian_saves.csv"
	end

	def set_csv_filename(filename)
		@csv_filename = filename
	end

	def add_row_to_file(row_hash,savename)
		csv_line = make_csv_line(row_hash,savename)
		append_to_csv_file(csv_line)

	end

	def make_csv_line(row_hash,savename)
		@savename = savename
		output = "\"#{@savename}\","
		output += "\"#{row_hash["row_1_box_1"]}\",\"#{row_hash["row_1_box_2"]}\",\"#{row_hash["row_1_box_3"]}\",\"#{row_hash["row_1_box_4"]}\","
		output += "\"#{row_hash["row_2_box_1"]}\",\"#{row_hash["row_2_box_2"]}\",\"#{row_hash["row_2_box_3"]}\",\"#{row_hash["row_2_box_4"]}\","
		output += "\"#{row_hash["row_3_box_1"]}\",\"#{row_hash["row_3_box_2"]}\",\"#{row_hash["row_3_box_3"]}\",\"#{row_hash["row_3_box_4"]}\","
		output += "\"#{row_hash["row_4_box_1"]}\",\"#{row_hash["row_4_box_2"]}\",\"#{row_hash["row_4_box_3"]}\",\"#{row_hash["row_4_box_4"]}\"\n"
		return output
	end

	def append_to_csv_file(csv_line)
		open(@csv_filename, 'a') do |f|
			f.puts csv_line
		end
	end

	def get_row_from_file(row_name)
		saves_hash = load_saves_hash
		return saves_hash[row_name]
	end

	def load_saves_hash
		saves_hash = {}
			CSV.foreach(@csv_filename, {headers: true, return_headers: false}) do |row|
				savename = row["savename"];
				saves_hash[savename] = row.to_hash
			end
		return saves_hash
	end
end