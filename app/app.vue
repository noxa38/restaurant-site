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
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #1a0a0a;
  --surface: #2a1515;
  --card: #3d2020;
  --card-inner: #4d2828;
  --border: #5a3030;
  --primary: #8b1515;
  --danger: #d32f2f;
  --success: #2e7d32;
  --warning: #e65100;
  --info: #1565c0;
  --text: #f5e6e6;
  --text-muted: #b39090;
  --radius: 4px;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: sans-serif;
}

.navbar {
  background: var(--surface);
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.nav-brand {
  color: var(--text);
  text-decoration: none;
  font-weight: bold;
}

.main {
  padding: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}
</style>
