import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Extras.css";

function transformChangelog(changelog) {
  let replacedChangelog = changelog
    .replace(
      /\[removed\]/g,
      '<div class="changelogBadge rem">Removed</div>'
    )
    .replace(
      /\[scrapped\]/g,
      '<div class="changelogBadge rem">Scrapped</div>'
    )
    .replace(
      /\[added\]/g,
      '<div class="changelogBadge add">Added</div>'
    )
    .replace(
      /\[being added\]/g,
      '<div class="changelogBadge add">Being Added</div>'
    )
    .replace(
      /\[unstable\]/g,
      '<div class="changelogBadge uns">Unstable</div>'
    )
    .replace(
      /\[experimental\]/g,
      '<div class="changelogBadge uns">Experimental</div>'
    )
    .replace(
      /\[labs content\]/g,
      '<div class="changelogBadge lab">Labs Content</div>'
    )
    .replace(
      /\[bug fix\]/g,
      '<div class="changelogBadge bug">Bug Fix</div>'
    );

  // Split the changelog string into individual entries
  const entries = replacedChangelog
    .split(";")
    .filter((entry) => entry.trim() !== "");

  // Transform each entry into an <li> element
  const transformedEntries = entries.map((entry) => `<li>${entry}</li>`);

  // Return the array of transformed entries
  return transformedEntries.join("");
}

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    document.getElementById("changelog").innerHTML =
      transformChangelog(__APP_CHANGELOG__);
    axios
      .get("https://callmeclover.serv00.net/api/version")
      .then((response) => {
        setData(response.data.version);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <p>
        Arcs was made in 2022 by{" "}
        <a target="_blank" href="clover.is-probably.gay">
          Clover Johnson
        </a>{" "}
        and was migrated to{" "}
        <a target="_blank" href="github.com/stalepretzels">
          Stale Pretzels
        </a>{" "}
        in 2023 for a complete rewrite.
      </p>
      <br />

      <p>Client version: {__APP_VERSION__}</p>
      <p>Server version: {data ? data : "Loading data..."}</p>

      <h3>Changelog:</h3>
      <div className="chalogContainer">
        <ul id="changelog"></ul>
      </div>
      <a href="/about/chnlogfaq">What do these mean?</a>
      <h4>Next planned major update: Accounts</h4>
      <br />
      <a href="/chat">
        <em>Proceed to chat app.</em>
      </a>
    </>
  );
}

function ChangelogAbout() {
  return <>
        <ul id="changelog">
        <li><div class="changelogBadge rem">Removed</div> = Removed to be reimplemented or partly removed.</li>
        <li><div class="changelogBadge rem">Scrapped</div> = Removed and not being added again. PRs with a viable solution may be accepted, but it is not likely.</li>
        <li><div class="changelogBadge add">Added</div> = Fully implemented and bug tested.</li>
        <li><div class="changelogBadge add">Being Added</div> = Not fully implemented or bug tested.</li>
        <li><div class="changelogBadge uns">Unstable</div> = Very likely to crash or destroy the client. Only used in Arcs Canary.</li>
        <li><div class="changelogBadge uns">Experimental</div> = Minor chance to break the client. Used in both Release and Canary.</li>
        <li><div class="changelogBadge lab">Labs Content</div> = Content that has moved from Canary to Release, but not finished yet.</li>
          <li><div class="changelogBadge bug">Bug Fix</div> = Used for bug fixes or patches.</li>
        </ul>
  </>
}


function Rules() {
  return (
    <>
      <div style={{ overflow: "scroll", width: "100%", height: "70%" }}>
        <ul>
          <li>
            <h3>
              <span style={{ fontWeight: 200 }}>
                <em>Don't spam, please.</em>
              </span>
            </h3>
          </li>
          <li>
            <h3>
              <span style={{ fontWeight: 200 }}>
                <em>No racism, homophobia, and the likes.</em>
              </span>
            </h3>
          </li>
          <li>
            <h3>
              <span style={{ fontWeight: 200 }}>
                <em>No explicit content.</em>
              </span>
            </h3>
          </li>
          <li>
            <h3>
              <span style={{ fontWeight: 200 }}>
                <em>Keep dedicated talk in dedicated channels.</em>
              </span>
            </h3>
          </li>
          <li>
            <h3>
              <span style={{ fontWeight: 200 }}>
                <em>Be kind.</em>
              </span>
            </h3>
          </li>
          <li>
            <h3>
              <span style={{ fontWeight: 400 }}>
                NOTICE: StalePretzels© retains the right to revoke access at any
                point in time due to refusal to comply with terms of service or
                as per request.
              </span>
            </h3>
          </li>
        </ul>
      </div>
      <a onClick={() => localStorage.setItem("readrules", true)} href="/chat">
        <em>Proceed to chat app.</em>
      </a>
    </>
  );
}

export { Rules, About, ChangelogAbout };
