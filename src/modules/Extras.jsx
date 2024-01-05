import React, { useEffect, useState } from 'react';
import axios from 'axios';

function transformChangelog(changelog) {
  let replacedChangelog = changelog.replace(/\[removed\]|\[scrapped\]/g, '<div class="changelogBadge red">Removed/Scrapped</div>').replace(/\[being added\]|\[added\]/g, '<div class="changelogBadge green">Being Added/Added</div>').replace(/\[unstable\]|\[labs content\]/g, '<div class="changelogBadge yellow">Unstable/Labs</div>');

  // Split the changelog string into individual entries
  const entries = replacedChangelog.split(';').filter((entry) => entry.trim() !== '');
  
  // Transform each entry into an <li> element
  const transformedEntries = entries.map((entry) => `<li>${entry}</li>`);
  
  // Return the array of transformed entries
  return transformedEntries.join('');
}

function About() {
    const [data, setData] = useState(null);

    useEffect(() => {
      document.getElementById('changelog').innerHTML = transformChangelog(__APP_CHANGELOG__);
        axios.get('https://callmeclover.serv00.net/api/version')
          .then(response => {
            
            setData(response.data.version);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
    
    return <main className="mainContainer">
    <p>Arcs was made in 2022 by <a target="_blank" href="clover.is-probably.gay">Clover Johnson</a> and was migrated to <a target="_blank" href="github.com/stalepretzels">Stale Pretzels</a> in 2023 for a complete rewrite.</p><br/>

    <p>Client version: {__APP_VERSION__}</p>
    <p>Server version: {data ? data : 'Loading data...'}</p>

<h3>Changelog:</h3>
<ul id="changelog"></ul>
<h4>Next planned major update: Accounts</h4>
<br/>
<a href="/chat"><em>Proceed to chat app.</em></a>
</main>
}

function Rules() {
    return <main className="mainContainer">
        <div style={{overflow: 'scroll', width: '100%', height: '70%'}}>
            <ul>
    <li><h3><span style={{fontWeight: 200}}><em>Don't spam, please.</em></span></h3></li>
    <li><h3><span style={{fontWeight: 200}}><em>No racism, homophobia, and the likes.</em></span></h3></li>
    <li><h3><span style={{fontWeight: 200}}><em>No explicit content.</em></span></h3></li>
<li><h3><span style={{fontWeight: 200}}><em>Keep dedicated talk in dedicated channels.</em></span></h3></li>
<li><h3><span style={{fontWeight: 200}}><em>Be kind.</em></span></h3></li>
    <li><h3><span style={{fontWeight: 400}}>NOTICE: StalePretzels© retains the right to revoke access at any point in time due to refusal to comply with terms of service or as per request.</span></h3></li>
    </ul></div>
    <a onClick={()=>localStorage.setItem("readrules", true)} href='/chat'><em>Proceed to chat app.</em></a>
    </main>
}

export {Rules, About};