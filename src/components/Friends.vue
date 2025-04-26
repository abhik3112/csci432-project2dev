<script setup>
import { onMounted, ref } from 'vue';


const errormsg = ref("")
const requests = ref([])


async function getFriendReq() {
  const token = localStorage.getItem("token")

  const url = `https://excursions-api-server.azurewebsites.net/friends/requests`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status === 200) {

    const data = (await response.json()).friendRequests;
    console.log(data);

    console.log("Recieved Friend Request:", data)

    requests.value = data
  }
  if (response.status === 400) {
    errormsg.value = "Bad Request"
  }
  if (response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  if (response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}
async function handleReq(reqId,isAccepted) {
  const token = localStorage.getItem("token")
  console.log("print",reqId,isAccepted);

  const url = `https://excursions-api-server.azurewebsites.net/friends/requests/${reqId}`

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      isAccepted
    })
  })
  if (response.status === 200) {

    let ind = requests.value.findIndex(v=>v._id == reqId);
    if(ind != -1) requests.value.splice(ind,1);

  }
  if (response.status === 400) {
    errormsg.value = "Bad Request"
  }
  if (response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  if (response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}

const userName = ref(localStorage.getItem("userName"));


onMounted(() => {
  getFriendReq()
})

</script>


<template>
  <div class="card">
    <h3>Friend Requests</h3>
    <p v-if="errormsg" class="error">{{ errormsg }}</p>
    <div v-for="request in requests" :key="request._id">
      <p>Sender: {{ request.sender[0].userName }}</p>
      <p>Reciever: {{ request.receiver[0].userName }}</p>
      <p>Status: {{ request.isAccepted? 'Accepted' : 'Pending' }}</p>
      <div v-if="request.sender[0].userName != userName">
        <button @click="handleReq(request._id,false)">Deny</button>
        <button @click="handleReq(request._id,true)">Accept</button>
      </div>
      <hr>
    </div>

  </div>

</template>

<style scoped>

main {
  margin-left: 15px;
}

button {
  background-color: #78C2F1;
  color: black;
  padding: 5px;
  font-size: 11px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  margin-left: 10px;
}

button:hover {
  box-shadow: 0 0 5px black;
}

</style>
