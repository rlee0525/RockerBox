# Problem:
# You are given a prefix expression. Write a program to evaluate it.
# Your program should accept as its first argument a path to a filename.
# The file contains one prefix expression per line.

# INPUT SAMPLE:
#
# 1
# * + 2 3 4
#
# Your program has to read this and insert it into any data structure you like.
# Traverse that data structure and evaluate the prefix expression.
# Each token is delimited by a whitespace.
# You may assume that the only valid operators appearing in test data are
# '+','*' and '/'(floating-point division).
# Please include unit tests that demonstrate how your code works.
#
# Please zip the contents of your solution named: `prefix-[lastname].zip`
#
# OUTPUT SAMPLE:
#
# Print to stdout, the output of the prefix expression, one per line. E.g.
#
# 1
# 20
#
# Constraints:
# The evaluation result will always be an integer >= 0.
# The number of the test cases is <= 40.

def evaluate_prefix(file_path)
  lines = File.readlines(file_path)
  lines.map(&:strip!)

  results = []

  lines.each do |line|
    results << calculate_prefix(line)
  end

  results.join("\n")
end

def calculate_prefix(string)
  operators = { "+" => true, "*" => true, "/" => true }
  string = string.split(" ")

  stack = []

  string.length.downto(0).each do |i|
    if operators[string[i]]
      left_operand = stack.pop
      right_operand = stack.pop

      case string[i]
      when "+"
        stack << left_operand + right_operand
      when "*"
        stack << left_operand * right_operand
      when "/"
        stack << left_operand.fdiv(right_operand)
      end
    else
      stack << string[i].to_i
    end
  end

  stack.last
end

# Testing

puts evaluate_prefix('./test_files/file1.txt')
puts evaluate_prefix('./test_files/file2.txt')
puts evaluate_prefix('./test_files/file3.txt')
