<template>
  <div class="app">
    <nav class="navbar">
      <NuxtLink to="/" class="nav-brand">RestauReserve</NuxtLink>
    </nav>
    <main class="main">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg: #1a0a0a;
  --surface: #2a1515;
  --card: #3d2020;
  --card-inner: #4d2828;
  --border: #5a3030;
  --primary: #8b1515;
  --primary-hover: #a31c1c;
  --danger: #d32f2f;
  --success: #2e7d32;
  --warning: #e65100;
  --info: #1565c0;
  --text: #f5e6e6;
  --text-muted: #b39090;
  --radius: 6px;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: var(--surface);
  padding: 1rem 2rem;
  border-bottom: 2px solid var(--border);
}

.nav-brand {
  color: var(--text);
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.nav-brand:hover {
  color: #fff;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
