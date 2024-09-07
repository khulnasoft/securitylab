platforms=(mac linux windows)
parsers=(sliver brute-ratel cobalt-strike)

for platform in "${platforms[@]}"; do
	echo "Creating server release for $platform"
	pkg applications/server/package.json -t node18-$platform-x64 -o release/SecGate-$platform/SecGate
	for parser in "${parsers[@]}"; do
		echo "Creating $parser release for $platform"
		pkg parsers/$parser-parser/package.json -t node18-$platform-x64 -o release/SecGate-$platform/parsers/$parser-parser
	done
done

