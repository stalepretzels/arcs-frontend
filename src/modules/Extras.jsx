function About() {
    return <main className="mainContainer">
    <p>Arcs was made in 2022 by <a target="_blank" href="clover.is-probably.gay">Clover Johnson</a> and was migrated to <a target="_blank" href="github.com/stalepretzels">Stale Pretzels</a> in 2023 for a complete rewrite.</p><br/>

<h3>Changelog:</h3>
<ul>
<li>Added /about, /rules, and /profile/edit pages.</li>
</ul>
<h4>Next planned major update: Accounts</h4>
<br/>
<a href="/chat"><em>Proceed to chat app.</em></a>
</main>
}

function Rules() {
    return <main className="mainContainer">
        <div style="overflow: scroll; width: 100%; height: 70%;">
    <h3><span style='font-weight: 200;'><em>Don't spam, please.</em></span></h3>
    <br/>
    <h3><span style='font-weight: 200;'><em>No racism, homophobia, and the likes.</em></span></h3>
    <br/>
<h3><span style='font-weight: 200;'><em>No explicit content.</em></span></h3>
    <br/>
<h3><span style='font-weight: 200;'><em>Keep dedicated talk in dedicated channels.</em></span></h3>
    <br/>
    <h3><span style='font-weight: 200;'><em>Be kind.</em></span></h3>
    <br/>
    <h3><span style='font-weight: 400;'>NOTICE: StalePretzels© retains the right to revoke access at any point in time due to refusal to comply with terms of service or as per request.</span></h3>
    </div>
    <a onclick='localStorage.setItem("readrules", true);' href='/chat'><em>Proceed to chat app.</em></a>
    </main>
}

export {Rules, About};