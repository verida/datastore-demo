<template>
  <b-container id="home">
    <b-row>
      <b-col>
        <b-card>
          <h1>Sandbox</h1>
          
          <p>This simple sandbox demonstrates the basic concepts of the Verida Datastore.</p>

          <ol>
            <li>Make sure Metamask is installed or your are using Brave browser with Crypto Wallets enabled</li>
            <li>Open your Javascript console</li>
            <li>Copy and paste the code below into your console to create your own encrypted databases</li>
          </ol>
          
          <p>Learn more by reading the <a href="https://docs.datastore.verida.io/" target="_blank">Verida Datastore documentation</a>.</p>

          <h2>Connect</h2>

          <p>Start by initialising Web3 in the browser and configuring the Verida Datastore library.</p>

          <pre>
            const web3Provider = await window.Verida.Helpers.wallet.connectWeb3('ethr');
            const address = await web3Provider.getAddress()
            window.Verida.setConfig({appName: 'Verida: Sandbox'});

            // Create a Verida instance
            const app = new window.Verida({'chain': 'ethr', 'address': address, 'web3Provider': web3Provider});

            // Connect the user, by asking them to sign a consent message using their Ethereum private key
            await app.connect(true)
            console.log("User is connected with DID: " + app.user.did)
          </pre>

          <h2>Databases</h2>

          <p>Lets open a database (or create if it doesn't exist), save a record, then view the record.</p>

          <p>We can also view the data locally (unencrypted) and on the remote server (encrypted) using private keys of the user</p>

          <pre>
            // Open / create a test database
            let db = await app.openDatabase('test_db');
            let item = await db.save({
              hello: 'world'
            });
            let items = await db.getMany();
            console.log(items);

            // Show the data stored in the local (unencrypted) database and the remote (encrypted) database
            let localData = await db._originalDb._localDb.allDocs({include_docs: true});
            console.log("Local data", localData);
            
            let remoteData = await db._originalDb._remoteDbEncrypted.allDocs({include_docs: true});
            console.log("Remote data", remoteData)
          </pre>

          <h2>Datastores</h2>

          <p>
            Datatores provide a fixed schema that must be validated before a record is saved. This allows data to be shared / syncronised
            across multiple applications that agree to use the same schema.
          </p>

          <pre>
            // Lets open a datastore with a defined schema, in this the `social/contact` datastore
            let contacts = await app.openDatastore('social/contact')

            // Lets save a result with an intentional error where the email is invalid
            let contact = {
              firstName: 'John',
              lastName: 'Smith',
              email: 'john__smith.com'
            }
            let success = await contacts.save(contact);

            if (!success) {
              console.error(contacts.errors);
            } else {
              console.log("Contact saved");
            }

            // Fix the email and save properly
            contact.email = 'john@smith.com';
            await contacts.save(contact);

            // View the saved record
            await contacts.getMany();
          </pre>

          <h2>Messaging</h2>
          
          <p>
            Every application has a built-in inbox for receiving messages and outbox for sending messages.
            This allows users and applications to send data between each other knowing nothing than the other user's DID and application name.
          </p>

          <p>This example sends a contact record to a user's Verida Vault.</p>

          <p><a href="https://vault.testnet.verida.io/">Open the Verida Vault on testnet</a> and copy your DID (from the profile page) into the code below</p>

          <pre>
            const did = 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74';
            const type = 'inbox/type/dataSend';

            // Generate an inbox message containing an array of data
            const data = {
              data: [
                {
                  name: 'Vitalik Buterin',
                  firstName: 'Vitalik',
                  lastName: 'Buterin',
                  email: 'me@vitalik.eth',
                  schema: 'https://schemas.verida.io/social/contact/schema.json'
                }
              ]
            };

            const message = 'New contact: ' + data.data.name;
            const config = {
              appName: 'Verida: Vault'
            };

            app.outbox.send(did, type, data, message, config)
          </pre>
        </b-card>

<!--
        <b-card class="user">
          <div v-if="!loggedIn">
            <h2>User</h2>
            <b-button v-on:click="login" variant="primary">Login</b-button>
          </div>
          <div v-if="loggedIn">
            <b-button v-on:click="logout" variant="danger" size="sm" class="disconnect">
              Logout
            </b-button>
            <h2>User</h2>
            <b-row>
              <b-col>
                <label>Address:</label>
              </b-col>
              <b-col>{{ veridaApp.user.address }}</b-col>
            </b-row>
          </div>
        </b-card>
-->
      </b-col>
    </b-row>
    <!--
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
    -->
  </b-container>
</template>

<script>
import VeridaApp from '@verida/datastore';
window.Verida = VeridaApp

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
      this.veridaApp = new VeridaApp('Verida Demo Application', 'ethr', this.address, web3Provider);
      
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

pre {
  padding: 30px;
  background: #f6f6f6;
  border-radius: 20px;
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
