<template>
  <b-container id="home">
    <b-row>
      <b-col>
        <b-card class="user">
          <div v-if="!loggedIn">
            <h2>User</h2>
            <b-button v-on:click="login" variant="primary">Login</b-button>
          </div>
          <div v-if="loggedIn">
            <b-button v-on:click="logout" variant="danger" size="sm" class="disconnect">Logout</b-button>
            <h2>User</h2>
            <b-row>
              <b-col>
                <label>Address:</label>
              </b-col>
              <b-col>{{ veridaApp.user.address }}</b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="loggedIn">
      <b-col>
        <b-button-group>
          <b-button v-on:click="createDoc('employment')" variant="light">Create Employment Document</b-button>
          <b-button v-on:click="createDoc('profile')" variant="light">Create Profile Document</b-button>
          <b-button v-on:click="createDoc('song')" variant="light">Create Song Document</b-button>
          <b-button v-on:click="sendInboxMessage()" variant="light">Send Inbox Message</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row v-if="loggedIn">
      <b-col>
        <b-card title="Employment Documents (encrypted)" class="docs-list">
          <ol class="" v-for="doc in docs.employment" v-bind:key="doc._id">
            <li>
              {{ doc._id }}: {{ JSON.stringify(doc) }}<br />
              <b-button v-on:click="updateDoc(doc, 'employment')" variant="light" size="sm">Update</b-button>
              <b-button v-on:click="deleteDoc(doc._id, 'employment')" variant="danger" size="sm">Delete</b-button>
            </li>
          </ol>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Profile" class="docs-list">
          <ol class="" v-for="doc in docs.profile" v-bind:key="doc.key">
            <li>
              {{ doc.key }}: {{ doc.value }}<br />
              <b-button v-on:click="updateProfile(doc.key)" variant="light" size="sm">Update</b-button>
              <b-button v-on:click="deleteProfile(doc.key)" variant="danger" size="sm">Delete</b-button>
            </li>
          </ol>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Songs" class="docs-list">
          <ol class="" v-for="doc in docs.song" v-bind:key="doc._id">
            <li>
              {{ doc._id }}: {{ JSON.stringify(doc) }}<br />
              <b-button v-on:click="updateDoc(doc, 'song')" variant="light" size="sm">Update</b-button>
              <b-button v-on:click="deleteDoc(doc._id, 'song')" variant="danger" size="sm">Delete</b-button>
            </li>
          </ol>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="Log" class="log">
          <pre>{{ log }}</pre>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VeridaApp from 'verida-datastore';

export default {
  name: 'Home',
  data: function() {
    return {
      loggedIn: false,
      veridaApp: null,
      log: "",
      docs: {
        "employment": [],
        "profile": [],
        "song": [],
      }
    }
  },
  methods: {
    login: async function() {
      let web3Provider = await VeridaApp.WalletHelper.connectWeb3('ethr');
      if (!web3Provider) {
        throw "Unable to locate valid web3 provider";
      }

      this.address = await VeridaApp.WalletHelper.getAddress('ethr');

      window.App = this;
      this.veridaApp = new VeridaApp("Verida Demo Application", 'ethr', this.address, web3Provider, {
        //appServerUrl: "http://localhost:5000/",
        //userServerUrl: "http://localhost:5000/",
        //didServerUrl: "http://localhost:5001/",
      });
      
      // Connect the user's wallet
      this.writeLog("Authenticating user with this demo app...");
      await this.veridaApp.connect(true);

      this.writeLog("Logged in");

      this.loggedIn = true;
      return;
/*
      this.writeLog("Initialising app");

      this.datastores = {
        employment: await this.veridaApp.openDatastore("employment"),
        song: await this.veridaApp.openDatastore("song")
      };

      await this.loadDocs("employment");
      await this.loadProfile();
      await this.loadDocs("song");
      await this.bindChanges();

      /*let datastore = await this.veridaApp.getDataStore("employment");
      datastore.on("afterInsert", function(data, response) {
        console.log("afterInsert() triggered");
      });
      */
    },
    logout: async function() {
      this.veridaApp.disconnect();
      this.veridaApp = null;
      this.loggedIn = false;
      this.writeLog("Logged out");
    },
    createDoc: async function(docType) {
      let response;

      switch (docType) {
        case 'employment':
          response = await this.datastores["employment"].save({
            "organisationName": "Telstra",
            "position": "Store Manager",
            "startDate": "2015-10-12",
            "endDate": "2016-03-09"
          });
          break;
        case 'profile':
          response = await this.veridaApp.wallet.profile.set("email", "john@test.com");
          await this.loadProfile();
          break;
        case 'song':
          response = await this.datastores["song"].save({
            "name": "Bitter Sweet Symphony",
            "artist": "The Verve"
          });
          break;
      }

      this.writeLog("Document created (" + docType + "): " + JSON.stringify(response));
    },
    writeLog: function(log) {
      this.log += log + "\n";
    },
    loadDocs: async function(docType) {
      this.writeLog("Loading "+docType+" documents...");
      this.docs[docType] = await this.datastores[docType].getMany();
      this.writeLog("Loaded "+docType+" documents");
    },
    loadProfile: async function() {
      this.writeLog("Loading profile documents...");
      this.docs["profile"] = await this.veridaApp.wallet.profile.getMany();
      this.datastores["profile"] = await this.veridaApp.wallet.profile.getDatastore();
      this.writeLog("Loaded profile documents");
    },
    updateProfile: async function(key) {
      this.writeLog("Updating profile value for: "+key);
      await this.veridaApp.wallet.profile.set(key, "jane@test.com");
    },
    deleteProfile: async function(key) {
      this.writeLog("Deleting profile key: "+key);
      await this.veridaApp.wallet.profile.delete(key);
    },
    deleteDoc: async function(docId, docType) {
      this.writeLog("Deleting "+docType+" document: "+docId);
      this.datastores[docType].delete(docId);
    },
    updateDoc: async function(doc, docType) {
      this.writeLog("Updating "+docType+" document: "+doc._id);
      switch (docType) {
        case "employment":
          doc.position = "CEO (Updated)";
          break;
        case "song":
          doc.duration = 358;
          break;
      }
      
      this.datastores[docType].save(doc);
    },
    bindChanges: async function() {
      // TODO: Work out how to bind changes within app.js (possible PouchDB bug)
      let app = this;

      async function bind(docType) {
        let datastore = app.datastores[docType];
        let db = await datastore.getDb();
        db = await db.getInstance();
      
        db.changes({
          since: 'now',
          live: true,
          include_docs: true
        }).on('change', function() {
          app.writeLog("Data has changed for "+docType+", reloading documents");
          app.loadDocs(docType);
        }).on('error', function() {
          app.writeLog("Data change tracking error occurred for "+docType);
        });
      }

      await bind("employment");
      await bind("profile");
      await bind("song");

      this.writeLog("Database change tracking setup");
    },
    sendInboxMessage: async function() {
      let did = "did:ethr:0x2e922f72f4f1a27701dde0627dfd693376ab0d02";
      let message = {
        "subject": "Hello chris",
        "message": "Welcome to the future of data",
        "schema": "inbox/message"
      };

      await this.veridaApp.inbox.send(did, message);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  
}
a {
  color: #42b983;
}

.btn.disconnect {
  float: right; top: 5px; right: 5px;
}
.user {
  margin-bottom: 10px;
}
.docs-list {
  height: 40vh;
  overflow: scroll;
  margin: 10px 0px;
}
.log {
  overflow: scroll;
  height: 20vh;
}
</style>
