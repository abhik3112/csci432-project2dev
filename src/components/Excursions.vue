<script setup>
import { onMounted } from 'vue';


async function getExcursions() {

const url = 'https://excursions-api-server.azurewebsites.net/national-parks'

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

  parks.value = data

  localStorage.setItem("parkcode", data[0].parkCode);
  localStorage.setItem("stateCode", data[0].stateCode);
}
else {
  errormsg.value = "Error fetching user data, code: " + response.status
}
}
onMounted(() => {
getExcursions()
})

async function save(e) {
  e.preventDefault()
  errormsg.value = ""
  const token = localStorage.getItem("token")

  const data = {
    email: eml.value || undefined,
    userName: usrnm.value || undefined,
    password: psswrd.value || undefined,
    firstName: frstnm.value || undefined,
    lastName: lstnm.value || undefined
  }

  const url = 'https://hap-app-api.azurewebsites.net/user'

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  let response = await fetch(url, options)

  console.log("status:",response.status)

  if (response.status === 200) {
    localStorage.setItem("userName", usrnm.value)
    localStorage.setItem('lastName', lstnm.value)
    localStorage.setItem('firstName', frstnm.value)
    localStorage.setItem('email', eml.value)

    console.log("success");

    errormsg.value = "Saved Successfully"

    modal.value.close(e)

    fetchUser();

    router.push({
      name: 'user'
    })
  }
  else if (response.status === 400) {
    errormsg.value = "Invalid email or password"
    console.log("bad request");
  }
  else if (response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}


async function dlt() {
  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }

  const token = userStore.token

  if (!token) {
    errormsg.value = "No token found"
    return
  }

  const url = 'https://hap-app-api.azurewebsites.net/user'

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.status === 200) {
    userStore.$reset()

    router.push({
      name: 'home'
    })
  }
  else if (response.status === 401) {
    errormsg.value = "Unauthorized"
    console.log("Unauthorized")
  }
  else if (response.status === 500) {
    errormsg.value = "Internal Server Error"
    console.log("Internal Server Error")
  }
}

</script>
