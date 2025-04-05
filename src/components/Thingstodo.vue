<script setup>
import { ref } from 'vue';

const errormsg = ref("")
const id = ref("")
const parkCode = ref("")
const stateCode = ref('')

async function fetchThingstodo() {

  const url = 'https://excursions-api-server.azurewebsites.net/things-to-do'

  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.status == 200) {
    let data = await response.json();

    console.log("from server", data);

    localStorage.getItem("parkcode", data.parkCode);
    localStorage.getItem("stateCode", data.stateCode);
  }
  else {
    errormsg.value = "Error fetching user data, code: " + response.status
  }
}
</script>
