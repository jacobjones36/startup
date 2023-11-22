(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
      document.getElementById('adminLogin').textContent = `Welcome ${userName}`;
      document.getElementById('adminLogins').textContent = `Welcome ${userName}`;
      
  }
})();

async function displayEvents() {
  let schedule = [];
    const response = await fetch('/api/schedule');
    schedule = await response.json();

    if(schedule.length) {
      let k = 1;
      for (const [i, j] of schedule.entries()) {
        document.getElementById(`${k}s`).textContent = 'Baseball';
        document.getElementById(`${k}g`).textContent = j.opponent;
        document.getElementById(`${k}d`).textContent = j.date;
        k++;
      }
    }
}


function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
  
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
  }

  displayQuote();
  displayEvents();
