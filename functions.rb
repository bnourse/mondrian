class MondrianServer

	def initialize
		@cfm = CSVFileModifier.new
		@save_data = {}
	end

	def save(data)		
		@cfm.add_row_to_file(data)
	end

end

class CSVFileModifier
	def initialize
		@csv_filename = "mondrian_saves.csv"
	end

	def set_csv_filename(filename)
		@csv_filename = filename
	end

	def add_row_to_file(row_hash)
		csv_line = make_csv_line(row_hash)
		append_to_csv_file(csv_line)

	end

	def make_csv_line(row_hash)
		@savename = "hardcoded"
		output = "#{@savename},"
		output += "#{row_hash["row_1_box_1"]},#{row_hash["row_1_box_2"]},#{row_hash["row_1_box_3"]},#{row_hash["row_1_box_4"]},"
		output += "#{row_hash["row_2_box_1"]},#{row_hash["row_2_box_2"]},#{row_hash["row_2_box_3"]},#{row_hash["row_2_box_4"]},"
		output += "#{row_hash["row_3_box_1"]},#{row_hash["row_3_box_2"]},#{row_hash["row_3_box_3"]},#{row_hash["row_3_box_4"]},"
		output += "#{row_hash["row_4_box_1"]},#{row_hash["row_4_box_2"]},#{row_hash["row_4_box_3"]},#{row_hash["row_4_box_4"]}\n"
		return output
	end

	def append_to_csv_file(csv_line)
		open(@csv_filename, 'a') do |f|
			f.puts csv_line
		end
	end

end