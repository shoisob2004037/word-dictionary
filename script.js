function search() {
    const show = document.getElementById('showing-result');
    const errorMessage = document.getElementById('error-message');
    const wordTitle = document.getElementById('word-title');
    const ul = document.getElementById('meaning-list');
    const audioBtn = document.getElementById('audioBtn');
    
    show.style.display = 'block';
    errorMessage.textContent = ''; 
    wordTitle.textContent = ''; 
    ul.innerHTML = ''; 
    audioBtn.style.display = 'none'; 

    const input = document.getElementById('search').value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.title && data.title === 'No Definitions Found') {
                errorMessage.textContent = 'Word not found. Please try another word.';
                return;
            }

            const formattedWord = data[0].word.charAt(0).toUpperCase() + data[0].word.slice(1).toLowerCase();
            wordTitle.textContent = formattedWord;

            if (data[0].phonetics && data[0].phonetics.length > 0) {
                const phonetic = data[0].phonetics.find(p => p.audio);
                if (phonetic && phonetic.audio) {
                    const audio = new Audio(phonetic.audio);
                    audioBtn.style.display = 'inline-block'; 
                    audioBtn.onclick = () => audio.play(); 
                }
            }

            data[0].meanings.forEach(meaning => {
                const partOfSpeech = document.createElement('p');
                partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
                partOfSpeech.style.fontWeight = 'bold';
                partOfSpeech.style.textAlign = 'center';
                partOfSpeech.style.color = 'green';
                partOfSpeech.style.textDecoration = 'underline';
                ul.appendChild(partOfSpeech);

                meaning.definitions.forEach(definition => {
                    const li = document.createElement('li');
                    li.textContent = definition.definition;
                    ul.appendChild(li);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        });
}