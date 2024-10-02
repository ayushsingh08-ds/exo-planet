document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value;
    if (query.length > 2) {
        fetch(`https://api.datamuse.com/sug?s=${query}`)
            .then(response => response.json())
            .then(data => {
                const suggestions = document.getElementById('suggestions');
                suggestions.innerHTML = '';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.word;
                    suggestions.appendChild(option);
                });
            });
    }
});
