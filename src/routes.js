import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';

// Components to Render Routes
import Layout from './components/Layout';
import Audits from './pages/Audits';
import Machines from './pages/Machines';
import Scan from './pages/Scan';
import Home from './pages/Home';
import Login from './components/Login';
import Vulnerability from './pages/Vulnerability';
import PageNotFound from './pages/PageNotFound';

// Hard Coded Data to test
import machinesJSON from './json/machines.json';
import portsJSON from './json/ports.json';
import vulnsJSON from './json/vulnerabilities';

const props = {

};

// In order to pass props into the Audits Component
let AuditsWrapper = ({match}) => {
  // Pass the audit's info
  let audit = {};
  const { audits } = props.client;
  for(let i = 0; i < audits.length; i++) {
    if(audits[i].id === match.params.id) {
      // ES6 Deep Copy object
      audit = Object.assign({}, audits[i]);
    }
  }
  // If Audit doesn't exist, redirect to 404 error page
  if(Object.keys(audit).length === 0) {
    //return (<Audits match={match} {...audit} />);
    return (<Redirect to={{ pathname: '/404', state: { from: match.url } }}/>);
  }
  return (<Audits match={match} {...audit} />);
}

let MachinesWrapper = ({match}) => {
  let machine = {};
  let ports = [];
  let vulnerabilities = [];

  const id = parseInt(match.params.id, 10);
  for(let i = 0; i < machines.length; i++) {
    if(machines[i].id === id) {
      machine = Object.assign({}, machines[i]);
    }
  }

  for(let i = 0; i < portsJSON.length; i++) {
    if(portsJSON[i].machine_id === id) {
      ports.push(portsJSON[i]);
    }
    if(vulnsJSON[i].machine_id === id) {
      vulnerabilities.push(vulnsJSON[i]);
    }
  }

  if(Object.keys(machine).length === 0) {
    // return (<Machines match={match} machine={machine} />);
    return (<Redirect to={{ pathname: '/not-found', state: { from: match.url } }}/>);
  }
  return (<Machines match={match} machine={machine} ports={ports} vulnerabilities={vulnerabilities}/>);
}

let ScanWrapper = ({match}) => {
  let scan = {};
  let machines = [];

  const { audits } = props.client;
  for(let i = 0; i < audits.length; i++) {
    if(audits[i].page) {
      
    }
    else if(audits[i].scan) {
      for(let j = 0; j < audits[i].scan.length; j++) {
        if(audits[i].scan[j].id === match.params.id) {
          scan = Object.assign({}, audits[i].scan[j]);
        }
      }
    }
  }

  for(let i = 0; i < machinesJSON.length; i++) {
    if(machinesJSON[i].scan_id === parseInt(match.params.id, 10)) {
      machines.push(machinesJSON[i]);
    }
  }
  // FIXME HANDLE REDIRECT LIKE THE REST
  // NOT DONE YET BECAUSE SCANS 1/2 DONT HAVE MACHINES
  // AND SCAN 10 DOESNT HAVE INFO
  return (<Scan match={match} scan={scan} machines={machines}/>);
}

let VulnerabilityWrapper = ({match}) => {
  // Pass the audit's info
  let vuln = {};
  const id = parseInt(match.params.id, 10);
  for(let i = 0; i < vulnsJSON.length; i++) {
    if(vulnsJSON[i].id === id) {
      vuln = vulnsJSON[i];
    }
  }
  // If Audit doesn't exist, redirect to 404 error page
  if(Object.keys(vuln).length === 0) {
    //return (<Audits match={match} {...audit} />);
    return (<Redirect to={{ pathname: '/404', state: { from: match.url } }}/>);
  }
  return (<Vulnerability match={match} vuln={vuln} />);
}

const RouterWrapper = () => (
  <Router history={history}>
    <Switch>
      <Route path='/login' component={Login} />
      <Layout history={history.location} client={props.client} audits={props.client.audits}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/scan/:id' component={ScanWrapper} />
          <Route path='/audit/:id' component={AuditsWrapper} />
          <Route path='/machine/:id' component={MachinesWrapper} />
          <Route path='/vulnerability/:id' component={VulnerabilityWrapper} />
          <Route component={PageNotFound} status={404}/>
        </Switch>
      </Layout>
    </Switch>
  </Router>
);

export default RouterWrapper;

props.client = {
  "id": "1",
  "name": "Pepsi Cola",
  "acronym": "",
  "country": "",
  "district": "",
  "municipality": "",
  "location": "",
  "address": "",
  "postal_code": "",
  "nif": "",
  "telephone": "",
  "fax": "",
  "website": "",
  "comment": "",
  "created_at": "2017-05-21 18:35:01",
  "updated_at": "2017-05-23 00:11:58",
  "includes_groups": "",
  "logo_file_name": "Screenshot_from_2016-12-19_11-17-11.png",
  "logo_content_type": "image/png",
  "logo_file_size": "392688",
  "logo_updated_at": "2017-04-26 15:12:08",
  "audits": [
    {
      "id": "1",
      "client_id": "1",
      "serial_number": "17EN_0001",
      "initiated_at": "2017-02-01",
      "created_at": "2017-05-21 18:35:01",
      "updated_at": "2017-05-21 18:35:01",
      "category": "external network",
      "closed_at": "NULL",
      "scan": [
        {
          "id": "1",
          "category": "external network",
          "network": "182.122.112.23"
        }
      ]
    },
    {
      "id": "2",
      "client_id": "1",
      "serial_number": "17W_0002",
      "initiated_at": "2017-01-01",
      "created_at": "2017-05-21 18:35:01",
      "updated_at": "2017-05-21 18:35:01",
      "category": "web",
      "closed_at": "NULL",
      "page": [
        {
          "id": "1",
          "url": "www.example_one.com",
          "vulns": [
            {
              "id": "1",
              "title": "Frameable response (potential Clickjacking)",
              "description": "The page contains a form with the following action URL, which is submitted over clear-text HTTP:<ul><li>http://172.31.20.2:85/DRC<wbr>/Recursos/Modulos<wbr>/Autenticacao/Login.php?A<wbr>=VL&amp;Sid=4175le6fekuk<wbr>7hutiqbdkq8po5</li></ul>The form contains the following password field:<ul><li>FormPassword</li></ul>",
              "impact": "",
              "solution": "You should review the application functions that are accessible from within the response, and determine whether they can be used by application users to perform any sensitive actions within the application. If so, then a framing attack targeting this response may result in unauthorized actions.<br><br>To effectively prevent framing attacks, the application should return a response header with the name <b>X-Frame-Options</b> and the value <b>DENY</b> to prevent framing altogether, or the value <b>SAMEORIGIN</b> to allow framing only by pages on the same origin as the response itself.",
              "severity": "Information",
              "request": "R0VUIC9EUkMvUmVjdXJzb3MvTW9kdWxvcy9BdXRlbnRpY2FjYW8vTG9naW4ucGhwIEhUVFAvMS4xDQpIb3N0OiAxNzIuMzEuMjAuMjo4NQ0KVXNlci1BZ2VudDogTW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjo0Ny4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzQ3LjANCkFjY2VwdDogdGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksKi8qO3E9MC44DQpBY2NlcHQtTGFuZ3VhZ2U6IGVuLVVTLGVuO3E9MC41DQpBY2NlcHQtRW5jb2Rpbmc6IGd6aXAsIGRlZmxhdGUNCkNvbm5lY3Rpb246IGtlZXAtYWxpdmUNCg0K",
              "response": "SFRUUC8xLjEgMjAwIE9LDQpDYWNoZS1Db250cm9sOiBuby1zdG9yZSwgbm8tY2FjaGUsIG11c3QtcmV2YWxpZGF0ZSwgcG9zdC1jaGVjaz0wLCBwcmUtY2hlY2s9MA0KUHJhZ21hOiBuby1jYWNoZQ0KQ29udGVudC1UeXBlOiB0ZXh0L2h0bWw7IGNoYXJzZXQ9aXNvLTg4NTktMQ0KRXhwaXJlczogVGh1LCAxOSBOb3YgMTk4MSAwODo1MjowMCBHTVQNClNlcnZlcjogTWljcm9zb2Z0LUlJUy83LjANClgtUG93ZXJlZC1CeTogUEhQLzUuMi44DQpTZXQtQ29va2llOiBTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzU7IHBhdGg9Lw0KWC1Qb3dlcmVkLUJ5OiBBU1AuTkVUDQpEYXRlOiBUdWUsIDAyIEF1ZyAyMDE2IDEwOjA2OjA0IEdNVA0KQ29udGVudC1MZW5ndGg6IDEzODcNCg0KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGQiPg0KPGh0bWw+DQo8aGVhZD4NCjx0aXRsZT5EUkMgUG9ydHVnYWwgLSBMb2dpbjwvdGl0bGU+DQo8bGluayB0eXBlPSJ0ZXh0L2NzcyIgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xheW91dExvZ2luLmNzcyIgLz4NCjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Imh0dHA6Ly8xNzIuMzEuMjAuMjo4NS9EUkMvUmVjdXJzb3MvRnJhbWV3b3Jrcy9qUXVlcnkvalF1ZXJ5LmpzIj48L3NjcmlwdD4NCjwvaGVhZD4NCjxib2R5Pg0KPGZvcm0gaWQ9IkZvcm1BY2NhbyIgbmFtZT0iRm9ybUFjY2FvIiBtZXRob2Q9InBvc3QiIGFjdGlvbj0iaHR0cDovLzE3Mi4zMS4yMC4yOjg1L0RSQy9SZWN1cnNvcy9Nb2R1bG9zL0F1dGVudGljYWNhby9Mb2dpbi5waHA/QT1WTCZTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzUiPg0KPGZpZWxkc2V0PjxsZWdlbmQ+RFJDIFBvcnR1Z2FsIC0gTG9naW4gPC9sZWdlbmQ+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+IDxpbWcgc3JjPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL0ltYWdlbnMvTG9naW4uanBnIj48L2ltZz4gPC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVVzZXJuYW1lIj5Vc2VybmFtZTwvbGFiZWw+PGlucHV0IHR5cGU9InRleHQiIGlkPSJGb3JtVXNlcm5hbWUiIG5hbWU9IkZvcm1Vc2VybmFtZSIgc2l6ZT0iMzAiIHZhbHVlPSIiIC8+PC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVBhc3N3b3JkIj5QYXNzd29yZDwvbGFiZWw+PGlucHV0IHR5cGU9InBhc3N3b3JkIiBpZD0iRm9ybVBhc3N3b3JkIiBuYW1lPSJGb3JtUGFzc3dvcmQiIHNpemU9IjMwIiB2YWx1ZT0iIiAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEiPjxiciAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEgQWxpbmhhbWVudG9EaXJlaXRhIj48aW5wdXQgdHlwZT0ic3VibWl0IiBjbGFzcz0iQm90YW8iIHZhbHVlPSIgTG9naW4gIiAvPjwvZGl2Pg0KPC9maWVsZHNldD4NCjwvZm9ybT4NCjxkaXYgY2xhc3M9IkluZm9ybWFjYW9Mb2dpbiI+PC9kaXY+DQo8L2JvZHk+DQo8L2h0bWw+DQo8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+IGRvY3VtZW50LkZvcm1BY2Nhby5Gb3JtVXNlcm5hbWUuZm9jdXMoKTsgPC9zY3JpcHQ+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPg0KCQkkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgfSk7IDwvc2NyaXB0Pg==",
              "cvss_score": "0",
              "cwe": "",
              "created_at": "2017-05-21 18:35:52",
              "updated_at": "2017-05-21 18:35:52",
              "risk_factor": "1",
              "affects": "NULL", 
              "content_revised": "1"
            },
            {
              "id": "2",
              "title": "Cleartext submission of password",
              "description": "The page contains a form with the following action URL, which is submitted over clear-text HTTP:<ul><li>http://172.31.20.2:85/DRC<wbr>/Recursos/Modulos<wbr>/Autenticacao/Login.php?A<wbr>=VL&amp;Sid=4175le6fekuk<wbr>7hutiqbdkq8po5</li></ul>The form contains the following password field:<ul><li>FormPassword</li></ul>",
              "impact": "",
              "solution": "The application should use transport-level encryption (SSL or TLS) to protect all sensitive communications passing between the client and the server. Communications that should be protected include the login mechanism and related functionality, and any functions where sensitive data can be accessed or privileged actions can be performed. These areas of the application should employ their own session handling mechanism, and the session tokens used should never be transmitted over unencrypted communications. If HTTP cookies are used for transmitting session tokens, then the secure flag should be set to prevent transmission over clear-text HTTP.",
              "severity": "High",
              "request": "R0VUIC9EUkMvUmVjdXJzb3MvTW9kdWxvcy9BdXRlbnRpY2FjYW8vTG9naW4ucGhwIEhUVFAvMS4xDQpIb3N0OiAxNzIuMzEuMjAuMjo4NQ0KVXNlci1BZ2VudDogTW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjo0Ny4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzQ3LjANCkFjY2VwdDogdGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksKi8qO3E9MC44DQpBY2NlcHQtTGFuZ3VhZ2U6IGVuLVVTLGVuO3E9MC41DQpBY2NlcHQtRW5jb2Rpbmc6IGd6aXAsIGRlZmxhdGUNCkNvbm5lY3Rpb246IGtlZXAtYWxpdmUNCg0K",
              "response": "SFRUUC8xLjEgMjAwIE9LDQpDYWNoZS1Db250cm9sOiBuby1zdG9yZSwgbm8tY2FjaGUsIG11c3QtcmV2YWxpZGF0ZSwgcG9zdC1jaGVjaz0wLCBwcmUtY2hlY2s9MA0KUHJhZ21hOiBuby1jYWNoZQ0KQ29udGVudC1UeXBlOiB0ZXh0L2h0bWw7IGNoYXJzZXQ9aXNvLTg4NTktMQ0KRXhwaXJlczogVGh1LCAxOSBOb3YgMTk4MSAwODo1MjowMCBHTVQNClNlcnZlcjogTWljcm9zb2Z0LUlJUy83LjANClgtUG93ZXJlZC1CeTogUEhQLzUuMi44DQpTZXQtQ29va2llOiBTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzU7IHBhdGg9Lw0KWC1Qb3dlcmVkLUJ5OiBBU1AuTkVUDQpEYXRlOiBUdWUsIDAyIEF1ZyAyMDE2IDEwOjA2OjA0IEdNVA0KQ29udGVudC1MZW5ndGg6IDEzODcNCg0KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGQiPg0KPGh0bWw+DQo8aGVhZD4NCjx0aXRsZT5EUkMgUG9ydHVnYWwgLSBMb2dpbjwvdGl0bGU+DQo8bGluayB0eXBlPSJ0ZXh0L2NzcyIgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xheW91dExvZ2luLmNzcyIgLz4NCjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Imh0dHA6Ly8xNzIuMzEuMjAuMjo4NS9EUkMvUmVjdXJzb3MvRnJhbWV3b3Jrcy9qUXVlcnkvalF1ZXJ5LmpzIj48L3NjcmlwdD4NCjwvaGVhZD4NCjxib2R5Pg0KPGZvcm0gaWQ9IkZvcm1BY2NhbyIgbmFtZT0iRm9ybUFjY2FvIiBtZXRob2Q9InBvc3QiIGFjdGlvbj0iaHR0cDovLzE3Mi4zMS4yMC4yOjg1L0RSQy9SZWN1cnNvcy9Nb2R1bG9zL0F1dGVudGljYWNhby9Mb2dpbi5waHA/QT1WTCZTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzUiPg0KPGZpZWxkc2V0PjxsZWdlbmQ+RFJDIFBvcnR1Z2FsIC0gTG9naW4gPC9sZWdlbmQ+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+IDxpbWcgc3JjPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL0ltYWdlbnMvTG9naW4uanBnIj48L2ltZz4gPC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVVzZXJuYW1lIj5Vc2VybmFtZTwvbGFiZWw+PGlucHV0IHR5cGU9InRleHQiIGlkPSJGb3JtVXNlcm5hbWUiIG5hbWU9IkZvcm1Vc2VybmFtZSIgc2l6ZT0iMzAiIHZhbHVlPSIiIC8+PC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVBhc3N3b3JkIj5QYXNzd29yZDwvbGFiZWw+PGlucHV0IHR5cGU9InBhc3N3b3JkIiBpZD0iRm9ybVBhc3N3b3JkIiBuYW1lPSJGb3JtUGFzc3dvcmQiIHNpemU9IjMwIiB2YWx1ZT0iIiAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEiPjxiciAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEgQWxpbmhhbWVudG9EaXJlaXRhIj48aW5wdXQgdHlwZT0ic3VibWl0IiBjbGFzcz0iQm90YW8iIHZhbHVlPSIgTG9naW4gIiAvPjwvZGl2Pg0KPC9maWVsZHNldD4NCjwvZm9ybT4NCjxkaXYgY2xhc3M9IkluZm9ybWFjYW9Mb2dpbiI+PC9kaXY+DQo8L2JvZHk+DQo8L2h0bWw+DQo8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+IGRvY3VtZW50LkZvcm1BY2Nhby5Gb3JtVXNlcm5hbWUuZm9jdXMoKTsgPC9zY3JpcHQ+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPg0KCQkkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgfSk7IDwvc2NyaXB0Pg==",
              "cvss_score": "0",
              "cwe": "",
              "created_at": "2017-05-21 18:35:52",
              "updated_at": "2017-05-21 18:35:52",
              "risk_factor": "4",
              "affects": "NULL",
              "content_revised": "1"
            },
            {
              "id": "3",
              "title": "Cross-site scripting (reflected)",
              "description": "The value of the <b>FormUsername</b> request parameter is copied into the value of an HTML tag attribute which is encapsulated in double quotation marks. The payload <b>39812\"&gt;&lt;script&gt;alert(1)&lt;<wbr>/script&gt;90dcb959aeb</b> was submitted in the FormUsername parameter. This input was echoed unmodified in the application's response.<br><br>This proof-of-concept attack demonstrates that it is possible to inject arbitrary JavaScript into the application's response.",
              "impact": "",
              "solution": "In most situations where user-controllable data is copied into application responses, cross-site scripting attacks can be prevented using two layers of defenses:<ul><li>Input should be validated as strictly as possible on arrival, given the kind of content which it is expected to contain. For example, personal names should consist of alphabetical and a small range of typographical characters, and be relatively short; a year of birth should consist of exactly four numerals; email addresses should match a well-defined regular expression. Input which fails the validation should be rejected, not sanitized.</li><li>User input should be HTML-encoded at any point where it is copied into application responses. All HTML metacharacters, including &lt; &gt; \" ' and =, should be replaced with the corresponding HTML entities (&amp;lt; &amp;gt; etc).</li></ul>In cases where the application's functionality allows users to author content using a restricted subset of HTML tags and attributes (for example, blog comments which allow limited formatting and linking), it is necessary to parse the supplied HTML to validate that it does not use any dangerous syntax; this is a non-trivial task.",
              "severity": "4",
              "request": "UE9TVCAvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xvZ2luLnBocD9BPVZMJlNpZD00MTc1bGU2ZmVrdWs3aHV0aXFiZGtxOHBvNSBIVFRQLzEuMQ0KSG9zdDogMTcyLjMxLjIwLjI6ODUNCkFjY2VwdDogKi8qDQpBY2NlcHQtTGFuZ3VhZ2U6IGVuDQpVc2VyLUFnZW50OiBNb3ppbGxhLzUuMCAoY29tcGF0aWJsZTsgTVNJRSA5LjA7IFdpbmRvd3MgTlQgNi4xOyBXaW42NDsgeDY0OyBUcmlkZW50LzUuMCkNCkNvbm5lY3Rpb246IGNsb3NlDQpSZWZlcmVyOiBodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xvZ2luLnBocA0KQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQNCkNvbnRlbnQtTGVuZ3RoOiA2Mw0KQ29va2llOiBTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzUNCg0KRm9ybVVzZXJuYW1lPVBldGVyK1dpbnRlcjM5ODEyIj48c2NyaXB0PmFsZXJ0KDEpPC9zY3JpcHQ+OTBkY2I5NTlhZWImRm9ybVBhc3N3b3JkPTU1NS01NTUtMDE5OUBleGFtcGxlLmNvbQ==",
              "response": "SFRUUC8xLjEgMjAwIE9LDQpDYWNoZS1Db250cm9sOiBuby1zdG9yZSwgbm8tY2FjaGUsIG11c3QtcmV2YWxpZGF0ZSwgcG9zdC1jaGVjaz0wLCBwcmUtY2hlY2s9MA0KUHJhZ21hOiBuby1jYWNoZQ0KQ29udGVudC1UeXBlOiB0ZXh0L2h0bWw7IGNoYXJzZXQ9aXNvLTg4NTktMQ0KRXhwaXJlczogVGh1LCAxOSBOb3YgMTk4MSAwODo1MjowMCBHTVQNClNlcnZlcjogTWljcm9zb2Z0LUlJUy83LjANClgtUG93ZXJlZC1CeTogUEhQLzUuMi44DQpYLVBvd2VyZWQtQnk6IEFTUC5ORVQNCkRhdGU6IFR1ZSwgMDIgQXVnIDIwMTYgMTA6MTk6MTMgR01UDQpDb25uZWN0aW9uOiBjbG9zZQ0KQ29udGVudC1MZW5ndGg6IDE1MjMNCg0KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGQiPg0KPGh0bWw+DQo8aGVhZD4NCjx0aXRsZT5EUkMgUG9ydHVnYWwgLSBMb2dpbjwvdGl0bGU+DQo8bGluayB0eXBlPSJ0ZXh0L2NzcyIgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xheW91dExvZ2luLmNzcyIgLz4NCjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Imh0dHA6Ly8xNzIuMzEuMjAuMjo4NS9EUkMvUmVjdXJzb3MvRnJhbWV3b3Jrcy9qUXVlcnkvalF1ZXJ5LmpzIj48L3NjcmlwdD4NCjwvaGVhZD4NCjxib2R5Pg0KPGZvcm0gaWQ9IkZvcm1BY2NhbyIgbmFtZT0iRm9ybUFjY2FvIiBtZXRob2Q9InBvc3QiIGFjdGlvbj0iaHR0cDovLzE3Mi4zMS4yMC4yOjg1L0RSQy9SZWN1cnNvcy9Nb2R1bG9zL0F1dGVudGljYWNhby9Mb2dpbi5waHA/QT1WTCZTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzUiPg0KPGZpZWxkc2V0PjxsZWdlbmQ+RFJDIFBvcnR1Z2FsIC0gTG9naW4gPC9sZWdlbmQ+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+IDxpbWcgc3JjPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL0ltYWdlbnMvTG9naW4uanBnIj48L2ltZz4gPC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVVzZXJuYW1lIj5Vc2VybmFtZTwvbGFiZWw+PGlucHV0IHR5cGU9InRleHQiIGlkPSJGb3JtVXNlcm5hbWUiIG5hbWU9IkZvcm1Vc2VybmFtZSIgc2l6ZT0iMzAiIHZhbHVlPSJQZXRlciBXaW50ZXIzOTgxMiI+PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0PjkwZGNiOTU5YWViIiAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEiPjxsYWJlbCBmb3I9IkZvcm1QYXNzd29yZCI+UGFzc3dvcmQ8L2xhYmVsPjxpbnB1dCB0eXBlPSJwYXNzd29yZCIgaWQ9IkZvcm1QYXNzd29yZCIgbmFtZT0iRm9ybVBhc3N3b3JkIiBzaXplPSIzMCIgdmFsdWU9IiIgLz48L2Rpdj4NCjxkaXYgY2xhc3M9IkxpbmhhIj48YnIgLz48L2Rpdj4NCjxkaXYgY2xhc3M9IkxpbmhhIEFsaW5oYW1lbnRvRGlyZWl0YSI+PGlucHV0IHR5cGU9InN1Ym1pdCIgY2xhc3M9IkJvdGFvIiB2YWx1ZT0iIExvZ2luICIgLz48L2Rpdj4NCjwvZmllbGRzZXQ+DQo8L2Zvcm0+DQo8ZGl2IGNsYXNzPSJJbmZvcm1hY2FvTG9naW4iPlRoZSBVc2VybmFtZVwgUGFzc3dvcmQgaXMgaW5jb3JyZWN0IG9yIHlvdSBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byB0aGUgQmFja09mZmljZTwvZGl2Pg0KPC9ib2R5Pg0KPC9odG1sPg0KPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPiBkb2N1bWVudC5Gb3JtQWNjYW8uRm9ybVBhc3N3b3JkLmZvY3VzKCk7IDwvc2NyaXB0PjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4NCgkJJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7IH0pOyA8L3NjcmlwdD4=",
              "cvss_score": "0",
              "cwe": "",
              "created_at": "2017-05-21 18:35:52",
              "updated_at": "2017-05-21 18:35:52",
              "risk_factor": "",
              "affects": "NULL",
              "content_revised": "1"
            },
            {
              "id": "4",
              "title": "Cookie without HttpOnly flag set",
              "description": "The following cookie was issued by the application and does not have the HttpOnly flag set:<ul><li>Sid=4175le6fekuk7hut<wbr>iqbdkq8po5; path=/</li></ul>The cookie does not appear to contain a session token, which may reduce the risk associated with this issue. You should review the contents of the cookie to determine its function.",
              "impact": "",
              "solution": "There is usually no good reason not to set the HttpOnly flag on all cookies. Unless you specifically require legitimate client-side scripts within your application to read or set a cookie's value, you should set the HttpOnly flag by including this attribute within the relevant Set-cookie directive.<br><br>You should be aware that the restrictions imposed by the HttpOnly flag can potentially be circumvented in some circumstances, and that numerous other serious attacks can be delivered by client-side script injection, aside from simple cookie stealing.",
              "severity": "Information",
              "request": "R0VUIC9EUkMvUmVjdXJzb3MvTW9kdWxvcy9BdXRlbnRpY2FjYW8vTG9naW4ucGhwIEhUVFAvMS4xDQpIb3N0OiAxNzIuMzEuMjAuMjo4NQ0KVXNlci1BZ2VudDogTW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjo0Ny4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzQ3LjANCkFjY2VwdDogdGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksKi8qO3E9MC44DQpBY2NlcHQtTGFuZ3VhZ2U6IGVuLVVTLGVuO3E9MC41DQpBY2NlcHQtRW5jb2Rpbmc6IGd6aXAsIGRlZmxhdGUNCkNvbm5lY3Rpb246IGtlZXAtYWxpdmUNCg0K",
              "response": "SFRUUC8xLjEgMjAwIE9LDQpDYWNoZS1Db250cm9sOiBuby1zdG9yZSwgbm8tY2FjaGUsIG11c3QtcmV2YWxpZGF0ZSwgcG9zdC1jaGVjaz0wLCBwcmUtY2hlY2s9MA0KUHJhZ21hOiBuby1jYWNoZQ0KQ29udGVudC1UeXBlOiB0ZXh0L2h0bWw7IGNoYXJzZXQ9aXNvLTg4NTktMQ0KRXhwaXJlczogVGh1LCAxOSBOb3YgMTk4MSAwODo1MjowMCBHTVQNClNlcnZlcjogTWljcm9zb2Z0LUlJUy83LjANClgtUG93ZXJlZC1CeTogUEhQLzUuMi44DQpTZXQtQ29va2llOiBTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzU7IHBhdGg9Lw0KWC1Qb3dlcmVkLUJ5OiBBU1AuTkVUDQpEYXRlOiBUdWUsIDAyIEF1ZyAyMDE2IDEwOjA2OjA0IEdNVA0KQ29udGVudC1MZW5ndGg6IDEzODcNCg0KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGQiPg0KPGh0bWw+DQo8aGVhZD4NCjx0aXRsZT5EUkMgUG9ydHVnYWwgLSBMb2dpbjwvdGl0bGU+DQo8bGluayB0eXBlPSJ0ZXh0L2NzcyIgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xheW91dExvZ2luLmNzcyIgLz4NCjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Imh0dHA6Ly8xNzIuMzEuMjAuMjo4NS9EUkMvUmVjdXJzb3MvRnJhbWV3b3Jrcy9qUXVlcnkvalF1ZXJ5LmpzIj48L3NjcmlwdD4NCjwvaGVhZD4NCjxib2R5Pg0KPGZvcm0gaWQ9IkZvcm1BY2NhbyIgbmFtZT0iRm9ybUFjY2FvIiBtZXRob2Q9InBvc3QiIGFjdGlvbj0iaHR0cDovLzE3Mi4zMS4yMC4yOjg1L0RSQy9SZWN1cnNvcy9Nb2R1bG9zL0F1dGVudGljYWNhby9Mb2dpbi5waHA/QT1WTCZTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzUiPg0KPGZpZWxkc2V0PjxsZWdlbmQ+RFJDIFBvcnR1Z2FsIC0gTG9naW4gPC9sZWdlbmQ+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+IDxpbWcgc3JjPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL0ltYWdlbnMvTG9naW4uanBnIj48L2ltZz4gPC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVVzZXJuYW1lIj5Vc2VybmFtZTwvbGFiZWw+PGlucHV0IHR5cGU9InRleHQiIGlkPSJGb3JtVXNlcm5hbWUiIG5hbWU9IkZvcm1Vc2VybmFtZSIgc2l6ZT0iMzAiIHZhbHVlPSIiIC8+PC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVBhc3N3b3JkIj5QYXNzd29yZDwvbGFiZWw+PGlucHV0IHR5cGU9InBhc3N3b3JkIiBpZD0iRm9ybVBhc3N3b3JkIiBuYW1lPSJGb3JtUGFzc3dvcmQiIHNpemU9IjMwIiB2YWx1ZT0iIiAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEiPjxiciAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEgQWxpbmhhbWVudG9EaXJlaXRhIj48aW5wdXQgdHlwZT0ic3VibWl0IiBjbGFzcz0iQm90YW8iIHZhbHVlPSIgTG9naW4gIiAvPjwvZGl2Pg0KPC9maWVsZHNldD4NCjwvZm9ybT4NCjxkaXYgY2xhc3M9IkluZm9ybWFjYW9Mb2dpbiI+PC9kaXY+DQo8L2JvZHk+DQo8L2h0bWw+DQo8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+IGRvY3VtZW50LkZvcm1BY2Nhby5Gb3JtVXNlcm5hbWUuZm9jdXMoKTsgPC9zY3JpcHQ+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPg0KCQkkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgfSk7IDwvc2NyaXB0Pg==",
              "cvss_score": "0",
              "cwe": "",
              "created_at": "2017-05-21 18:35:52",
              "updated_at": "2017-05-21 18:35:52",
              "risk_factor": "1",
              "affects": "NULL",
              "content_revised": "1"
            },
            {
              "id": "5",
              "title": "Password field with autocomplete enabled",
              "description": "The page contains a form with the following action URL:<ul><li>http://172.31.20.2:85/DRC<wbr>/Recursos/Modulos<wbr>/Autenticacao/Login.php?A<wbr>=VL&amp;Sid=4175le6fekuk<wbr>7hutiqbdkq8po5</li></ul>The form contains the following password field with autocomplete enabled:<ul><li>FormPassword</li></ul>",
              "impact": "",
              "solution": "To prevent browsers from storing credentials entered into HTML forms, you should include the attribute <b>autocomplete=\"off\"</b> within the FORM tag (to protect all form fields) or within the relevant INPUT tags (to protect specific individual fields).",
              "severity": "Low",
              "request": "R0VUIC9EUkMvUmVjdXJzb3MvTW9kdWxvcy9BdXRlbnRpY2FjYW8vTG9naW4ucGhwIEhUVFAvMS4xDQpIb3N0OiAxNzIuMzEuMjAuMjo4NQ0KVXNlci1BZ2VudDogTW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjo0Ny4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzQ3LjANCkFjY2VwdDogdGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksKi8qO3E9MC44DQpBY2NlcHQtTGFuZ3VhZ2U6IGVuLVVTLGVuO3E9MC41DQpBY2NlcHQtRW5jb2Rpbmc6IGd6aXAsIGRlZmxhdGUNCkNvbm5lY3Rpb246IGtlZXAtYWxpdmUNCg0K",
              "response": "SFRUUC8xLjEgMjAwIE9LDQpDYWNoZS1Db250cm9sOiBuby1zdG9yZSwgbm8tY2FjaGUsIG11c3QtcmV2YWxpZGF0ZSwgcG9zdC1jaGVjaz0wLCBwcmUtY2hlY2s9MA0KUHJhZ21hOiBuby1jYWNoZQ0KQ29udGVudC1UeXBlOiB0ZXh0L2h0bWw7IGNoYXJzZXQ9aXNvLTg4NTktMQ0KRXhwaXJlczogVGh1LCAxOSBOb3YgMTk4MSAwODo1MjowMCBHTVQNClNlcnZlcjogTWljcm9zb2Z0LUlJUy83LjANClgtUG93ZXJlZC1CeTogUEhQLzUuMi44DQpTZXQtQ29va2llOiBTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzU7IHBhdGg9Lw0KWC1Qb3dlcmVkLUJ5OiBBU1AuTkVUDQpEYXRlOiBUdWUsIDAyIEF1ZyAyMDE2IDEwOjA2OjA0IEdNVA0KQ29udGVudC1MZW5ndGg6IDEzODcNCg0KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGQiPg0KPGh0bWw+DQo8aGVhZD4NCjx0aXRsZT5EUkMgUG9ydHVnYWwgLSBMb2dpbjwvdGl0bGU+DQo8bGluayB0eXBlPSJ0ZXh0L2NzcyIgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xheW91dExvZ2luLmNzcyIgLz4NCjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Imh0dHA6Ly8xNzIuMzEuMjAuMjo4NS9EUkMvUmVjdXJzb3MvRnJhbWV3b3Jrcy9qUXVlcnkvalF1ZXJ5LmpzIj48L3NjcmlwdD4NCjwvaGVhZD4NCjxib2R5Pg0KPGZvcm0gaWQ9IkZvcm1BY2NhbyIgbmFtZT0iRm9ybUFjY2FvIiBtZXRob2Q9InBvc3QiIGFjdGlvbj0iaHR0cDovLzE3Mi4zMS4yMC4yOjg1L0RSQy9SZWN1cnNvcy9Nb2R1bG9zL0F1dGVudGljYWNhby9Mb2dpbi5waHA/QT1WTCZTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzUiPg0KPGZpZWxkc2V0PjxsZWdlbmQ+RFJDIFBvcnR1Z2FsIC0gTG9naW4gPC9sZWdlbmQ+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+IDxpbWcgc3JjPSJodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL0ltYWdlbnMvTG9naW4uanBnIj48L2ltZz4gPC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVVzZXJuYW1lIj5Vc2VybmFtZTwvbGFiZWw+PGlucHV0IHR5cGU9InRleHQiIGlkPSJGb3JtVXNlcm5hbWUiIG5hbWU9IkZvcm1Vc2VybmFtZSIgc2l6ZT0iMzAiIHZhbHVlPSIiIC8+PC9kaXY+DQo8ZGl2IGNsYXNzPSJMaW5oYSI+PGxhYmVsIGZvcj0iRm9ybVBhc3N3b3JkIj5QYXNzd29yZDwvbGFiZWw+PGlucHV0IHR5cGU9InBhc3N3b3JkIiBpZD0iRm9ybVBhc3N3b3JkIiBuYW1lPSJGb3JtUGFzc3dvcmQiIHNpemU9IjMwIiB2YWx1ZT0iIiAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEiPjxiciAvPjwvZGl2Pg0KPGRpdiBjbGFzcz0iTGluaGEgQWxpbmhhbWVudG9EaXJlaXRhIj48aW5wdXQgdHlwZT0ic3VibWl0IiBjbGFzcz0iQm90YW8iIHZhbHVlPSIgTG9naW4gIiAvPjwvZGl2Pg0KPC9maWVsZHNldD4NCjwvZm9ybT4NCjxkaXYgY2xhc3M9IkluZm9ybWFjYW9Mb2dpbiI+PC9kaXY+DQo8L2JvZHk+DQo8L2h0bWw+DQo8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+IGRvY3VtZW50LkZvcm1BY2Nhby5Gb3JtVXNlcm5hbWUuZm9jdXMoKTsgPC9zY3JpcHQ+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPg0KCQkkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgfSk7IDwvc2NyaXB0Pg==",
              "cvss_score": "0",
              "cwe": "",
              "created_at": "2017-05-21 18:35:52",
              "updated_at": "2017-05-21 18:35:52",
              "risk_factor": "2",
              "affects": "NULL", 
              "content_revised": "1"
            },
            {
              "id": "6",
              "title": "SQL injection",
              "description": "The <b>FormUsername</b> parameter appears to be vulnerable to SQL injection attacks. The payload <b>'</b> was submitted in the FormUsername parameter, and a database error message was returned. You should review the contents of the error message, and the application's handling of other input, to confirm whether a vulnerability is present.<br><br>The database appears to be Microsoft SQL Server.",
              "impact": "",
              "solution": "The most effective way to prevent SQL injection attacks is to use parameterized queries (also known as prepared statements) for all database access. This method uses two steps to incorporate potentially tainted data into SQL queries: first, the application specifies the structure of the query, leaving placeholders for each item of user input; second, the application specifies the contents of each placeholder. Because the structure of the query has already defined in the first step, it is not possible for malformed data in the second step to interfere with the query structure. You should review the documentation for your database and application platform to determine the appropriate APIs which you can use to perform parameterized queries. It is strongly recommended that you parameterize <i>every</i> variable data item that is incorporated into database queries, even if it is not obviously tainted, to prevent oversights occurring and avoid vulnerabilities being introduced by changes elsewhere within the code base of the application.<br><br>You should be aware that some commonly employed and recommended mitigations for SQL injection vulnerabilities are not always effective:<ul><li>One common defense is to double up any single quotation marks appearing within user input before incorporating that input into a SQL query. This defense is designed to prevent malformed data from terminating the string in which it is inserted. However, if the data being incorporated into queries is numeric, then the defense may fail, because numeric data may not be encapsulated within quotes, in which case only a space is required to break out of the data context and interfere with the query. Further, in second-order SQL injection attacks, data that has been safely escaped when initially inserted into the database is subsequently read from the database and then passed back to it again. Quotation marks that have been doubled up initially will return to their original form when the data is reused, allowing the defense to be bypassed.</li><li>Another often cited defense is to use stored procedures for database access. While stored procedures can provide security benefits, they are not guaranteed to prevent SQL injection attacks. The same kinds of vulnerabilities that arise within standard dynamic SQL queries can arise if any SQL is dynamically constructed within stored procedures. Further, even if the procedure is sound, SQL injection can arise if the procedure is invoked in an unsafe manner using user-controllable data.</li></ul>",
              "severity": "High",
              "request": "UE9TVCAvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xvZ2luLnBocD9BPVZMJlNpZD00MTc1bGU2ZmVrdWs3aHV0aXFiZGtxOHBvNSBIVFRQLzEuMQ0KSG9zdDogMTcyLjMxLjIwLjI6ODUNCkFjY2VwdDogKi8qDQpBY2NlcHQtTGFuZ3VhZ2U6IGVuDQpVc2VyLUFnZW50OiBNb3ppbGxhLzUuMCAoY29tcGF0aWJsZTsgTVNJRSA5LjA7IFdpbmRvd3MgTlQgNi4xOyBXaW42NDsgeDY0OyBUcmlkZW50LzUuMCkNCkNvbm5lY3Rpb246IGNsb3NlDQpSZWZlcmVyOiBodHRwOi8vMTcyLjMxLjIwLjI6ODUvRFJDL1JlY3Vyc29zL01vZHVsb3MvQXV0ZW50aWNhY2FvL0xvZ2luLnBocA0KQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQNCkNvbnRlbnQtTGVuZ3RoOiA2Mw0KQ29va2llOiBTaWQ9NDE3NWxlNmZla3VrN2h1dGlxYmRrcThwbzUNCg0KRm9ybVVzZXJuYW1lPVBldGVyK1dpbnRlcicmRm9ybVBhc3N3b3JkPTU1NS01NTUtMDE5OUBleGFtcGxlLmNvbQ==",
              "cvss_score": "0",
              "cwe": "",
              "created_at": "2017-05-21 18:35:52",
              "updated_at": "2017-05-21 18:35:52",
              "risk_factor": "4",
              "affects": "NULL",
              "content_revised": "1"
            }
          ]
        }
      ]
    },
    {
      "id": "3", 
      "client_id": "1",
      "serial_number": "17IN_0003",
      "initiated_at": "2017-03-01",
      "created_at": "2017-05-21 18:35:01",
      "updated_at": "2017-05-21 18:35:01",
      "category": "internal network",
      "closed_at": "NULL",
      "scan": [
        {
          "id": "2",
          "category": "internal network",
          "network": "10.10.67.193/26"
        }
      ]
    }
  ]
}


const machines = [{"id":1,"scan_id":10,"hostname":"static.net","ip_address":"195.23.5.253","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":2,"scan_id":10,"hostname":"static.net","ip_address":"195.23.5.245","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":3,"scan_id":10,"hostname":"static.net","ip_address":"195.23.5.229","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":4,"scan_id":10,"hostname":"static.net","ip_address":"195.23.5.215","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":5,"scan_id":10,"hostname":"static.net","ip_address":"195.23.5.200","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":6,"scan_id":10,"hostname":"mail2","ip_address":"195.23.5.196","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Vista","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":7,"scan_id":10,"hostname":"static.net","ip_address":"195.23.5.193","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":8,"scan_id":10,"hostname":null,"ip_address":"10.1.1.240","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":9,"scan_id":10,"hostname":null,"ip_address":"10.1.1.239","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":10,"scan_id":10,"hostname":null,"ip_address":"10.1.1.238","mac_address":"","dns_name":"","operating_system":"Brocade Switch","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":11,"scan_id":10,"hostname":null,"ip_address":"10.1.1.237","mac_address":"","dns_name":"","operating_system":"Brocade Switch","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":12,"scan_id":10,"hostname":null,"ip_address":"10.1.1.236","mac_address":"","dns_name":"","operating_system":"HP StorageWorks","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":13,"scan_id":10,"hostname":null,"ip_address":"10.1.1.235","mac_address":"","dns_name":"","operating_system":"HP StorageWorks","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":14,"scan_id":10,"hostname":null,"ip_address":"10.1.1.232","mac_address":"","dns_name":"","operating_system":"VMware ESXi","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":15,"scan_id":10,"hostname":null,"ip_address":"10.1.1.231","mac_address":"","dns_name":"","operating_system":"Lantronix Universal Device Server UDS1100","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":16,"scan_id":10,"hostname":null,"ip_address":"10.1.1.230","mac_address":"","dns_name":"","operating_system":"Lantronix Universal Device Server UDS1100","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":17,"scan_id":10,"hostname":"srvdocs","ip_address":"10.1.1.229","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":18,"scan_id":10,"hostname":null,"ip_address":"10.1.1.227","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":19,"scan_id":10,"hostname":null,"ip_address":"10.1.1.226","mac_address":"","dns_name":"","operating_system":"HP Integrated Lights Out","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":20,"scan_id":10,"hostname":null,"ip_address":"10.1.1.224","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":21,"scan_id":10,"hostname":null,"ip_address":"10.1.1.223","mac_address":"","dns_name":"","operating_system":"AIX 5.2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":22,"scan_id":10,"hostname":null,"ip_address":"10.1.1.222","mac_address":"","dns_name":"","operating_system":"HP Integrated Lights Out","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":23,"scan_id":10,"hostname":null,"ip_address":"10.1.1.220","mac_address":"","dns_name":"","operating_system":"HP Integrated Lights Out","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":24,"scan_id":10,"hostname":null,"ip_address":"10.1.1.218","mac_address":"","dns_name":"","operating_system":"Brocade Switch","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":25,"scan_id":10,"hostname":null,"ip_address":"10.1.1.217","mac_address":"","dns_name":"","operating_system":"Brocade Switch","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":26,"scan_id":10,"hostname":null,"ip_address":"10.1.1.216","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":27,"scan_id":10,"hostname":null,"ip_address":"10.1.1.215","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":28,"scan_id":10,"hostname":null,"ip_address":"10.1.1.214","mac_address":"","dns_name":"","operating_system":"HP Integrated Lights Out","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":29,"scan_id":10,"hostname":null,"ip_address":"10.1.1.213","mac_address":"","dns_name":"","operating_system":"Microsoft Windows 7","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":30,"scan_id":10,"hostname":null,"ip_address":"10.1.1.212","mac_address":"","dns_name":"","operating_system":"Microsoft Windows 7","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":31,"scan_id":10,"hostname":null,"ip_address":"10.1.1.211","mac_address":"","dns_name":"","operating_system":"HP Integrated Lights Out","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":32,"scan_id":10,"hostname":null,"ip_address":"10.1.1.210","mac_address":"","dns_name":"","operating_system":"Microsoft Windows 7","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":33,"scan_id":10,"hostname":null,"ip_address":"10.1.1.209","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":34,"scan_id":10,"hostname":null,"ip_address":"10.1.1.208","mac_address":"","dns_name":"","operating_system":"HP Integrated Lights Out","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":35,"scan_id":10,"hostname":null,"ip_address":"10.1.1.207","mac_address":"","dns_name":"","operating_system":"Microsoft Windows 7","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":36,"scan_id":10,"hostname":null,"ip_address":"10.1.1.206","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":37,"scan_id":10,"hostname":null,"ip_address":"10.1.1.204","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":38,"scan_id":10,"hostname":null,"ip_address":"10.1.1.203","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":39,"scan_id":10,"hostname":null,"ip_address":"10.1.1.202","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":40,"scan_id":10,"hostname":null,"ip_address":"10.1.1.201","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":41,"scan_id":10,"hostname":null,"ip_address":"10.1.1.200","mac_address":"","dns_name":"","operating_system":"HP Integrated Lights Out","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":42,"scan_id":10,"hostname":null,"ip_address":"10.1.1.199","mac_address":"","dns_name":"","operating_system":"","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":43,"scan_id":10,"hostname":null,"ip_address":"10.1.1.185","mac_address":"","dns_name":"","operating_system":"Linux Kernel 3.13 on Ubuntu 14.04 (trusty)","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":44,"scan_id":10,"hostname":null,"ip_address":"10.1.1.171","mac_address":"","dns_name":"","operating_system":"Microsoft Windows 7 Professional","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":45,"scan_id":10,"hostname":"v004","ip_address":"10.1.1.156","mac_address":"","dns_name":"","operating_system":"Microsoft Windows XP Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":46,"scan_id":10,"hostname":"proxy01","ip_address":"10.1.1.135","mac_address":"","dns_name":"","operating_system":"Linux Kernel 3.13","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":47,"scan_id":10,"hostname":"v001","ip_address":"10.1.1.133","mac_address":"","dns_name":"","operating_system":"Microsoft Windows XP Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":48,"scan_id":10,"hostname":null,"ip_address":"10.1.1.106","mac_address":"","dns_name":"","operating_system":"Brocade Switch","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":49,"scan_id":10,"hostname":null,"ip_address":"10.1.1.105","mac_address":"","dns_name":"","operating_system":"Brocade Switch","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":50,"scan_id":10,"hostname":null,"ip_address":"10.1.1.99","mac_address":"","dns_name":"","operating_system":"HP-UX 11.00","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":51,"scan_id":10,"hostname":null,"ip_address":"10.1.1.87","mac_address":"","dns_name":"","operating_system":"Linux Kernel 3.13 on Ubuntu 14.04 (trusty)","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":52,"scan_id":10,"hostname":"srvcmabrk01","ip_address":"10.1.1.83","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Enterprise Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":53,"scan_id":10,"hostname":"srvcmards03","ip_address":"10.1.1.82","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Enterprise Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":54,"scan_id":10,"hostname":"srvcmards02","ip_address":"10.1.1.81","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Enterprise Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":55,"scan_id":10,"hostname":"srvcmards01","ip_address":"10.1.1.80","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Enterprise Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":56,"scan_id":10,"hostname":null,"ip_address":"10.1.1.70","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":57,"scan_id":10,"hostname":"csimoes01","ip_address":"10.1.1.69","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":58,"scan_id":10,"hostname":"sede01","ip_address":"10.1.1.68","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":59,"scan_id":10,"hostname":"srvcmaexch01","ip_address":"10.1.1.67","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":60,"scan_id":10,"hostname":"cluster04","ip_address":"10.1.1.66","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":61,"scan_id":10,"hostname":"srvcmaintr01","ip_address":"10.1.1.65","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":62,"scan_id":10,"hostname":"srvcmaintr02","ip_address":"10.1.1.64","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":63,"scan_id":10,"hostname":"srvcmamweb","ip_address":"10.1.1.55","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":64,"scan_id":10,"hostname":"srvcmadocb","ip_address":"10.1.1.51","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":65,"scan_id":10,"hostname":"srvcmabiblo01","ip_address":"10.1.1.50","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":66,"scan_id":10,"hostname":"sql03","ip_address":"10.1.1.48","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":67,"scan_id":10,"hostname":"cluster03","ip_address":"10.1.1.47","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":68,"scan_id":10,"hostname":"srvcmasql06","ip_address":"10.1.1.46","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":69,"scan_id":10,"hostname":"srvcmasql05","ip_address":"10.1.1.45","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":70,"scan_id":10,"hostname":"srvcmasql04","ip_address":"10.1.1.44","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":71,"scan_id":10,"hostname":"sql02","ip_address":"10.1.1.43","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":72,"scan_id":10,"hostname":"cluster02","ip_address":"10.1.1.42","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":73,"scan_id":10,"hostname":"srvcmasql03","ip_address":"10.1.1.41","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":74,"scan_id":10,"hostname":"srvcmasigdb","ip_address":"10.1.1.40","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Enterprise Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":75,"scan_id":10,"hostname":"srvcmasigas","ip_address":"10.1.1.39","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Enterprise Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":76,"scan_id":10,"hostname":"srvcmasigas2","ip_address":"10.1.1.38","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Standard Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":77,"scan_id":10,"hostname":"sql","ip_address":"10.1.1.27","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":78,"scan_id":10,"hostname":"msdtc","ip_address":"10.1.1.26","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":79,"scan_id":10,"hostname":null,"ip_address":"10.1.1.25","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Enterprise Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":80,"scan_id":10,"hostname":null,"ip_address":"10.1.1.24","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":81,"scan_id":10,"hostname":null,"ip_address":"10.1.1.23","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":82,"scan_id":10,"hostname":null,"ip_address":"10.1.1.22","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":83,"scan_id":10,"hostname":"srvcmasql01","ip_address":"10.1.1.21","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":84,"scan_id":10,"hostname":"srvcmagest03","ip_address":"10.1.1.20","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":85,"scan_id":10,"hostname":"srvcmagest02","ip_address":"10.1.1.19","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":86,"scan_id":10,"hostname":"srvcmagest04","ip_address":"10.1.1.18","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":87,"scan_id":10,"hostname":null,"ip_address":"10.1.1.16","mac_address":"","dns_name":"","operating_system":"Linux Kernel 3.13 on Ubuntu 14.04 (trusty)","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":88,"scan_id":10,"hostname":null,"ip_address":"10.1.1.15","mac_address":"","dns_name":"","operating_system":"Linux Kernel 3.13 on Ubuntu 14.04 (trusty)","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":89,"scan_id":10,"hostname":"bigbluebutton","ip_address":"10.1.1.14","mac_address":"","dns_name":"","operating_system":"Linux Kernel 3.16 on Debian 8.0 (jessie)","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":90,"scan_id":10,"hostname":"exsrv","ip_address":"10.1.1.11","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2003 Service Pack 2","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":91,"scan_id":10,"hostname":"srvcmasede01","ip_address":"10.1.1.10","mac_address":"","dns_name":"","operating_system":"Microsoft Windows Server 2008 R2 Enterprise Service Pack 1","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":92,"scan_id":10,"hostname":null,"ip_address":"10.1.1.3","mac_address":"","dns_name":"","operating_system":"CISCO IOS","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":93,"scan_id":10,"hostname":null,"ip_address":"10.1.1.2","mac_address":"","dns_name":"","operating_system":"HP Switch","created_at":"2017-05-21T17:35:01.000Z","os_family":""},{"id":94,"scan_id":10,"hostname":null,"ip_address":"10.1.1.1","mac_address":"","dns_name":"","operating_system":"CISCO IOS","created_at":"2017-05-21T17:35:01.000Z","os_family":""}]