const fetchEntries = async (req, res) => {
    try {
        const { category, limit } = req.query;

        let url = 'https://api.publicapis.org/entries';

        // Fetch data from the public API
        const response = await fetch(url);
        const data = await response.json();

        let filteredData = data.entries;

        // Filter by category if provided
        if (category) {

            const lowercaseCategory = category.toLowerCase();
            filteredData = filteredData.filter(entry => entry.Category.toLowerCase() === lowercaseCategory);

            if (filteredData.length === 0) {
                return res.status(404).json({ message: `No entries found for category '${category}'` });
            }
        }

        // Limit the number of results if limit is provided
        if (limit) {
            const limitNumber = parseInt(limit);
            if (isNaN(limitNumber) || limitNumber <= 0) {
                return res.status(400).json({ message: 'Invalid limit parameter. Limit must be a positive integer' });
            }
            filteredData = filteredData.slice(0, limitNumber);
        }

        res.status(200).json({ count: filteredData.length, entries: filteredData });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {fetchEntries};