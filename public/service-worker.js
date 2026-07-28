// Service worker mínimo da Kosium.
// Sua única função aqui é permitir que o navegador ofereça "Instalar app" —
// não guardamos nenhum dado do paciente offline, de propósito: login e dados
// continuam sempre dependendo da internet e do banco de dados na nuvem.

const CACHE_NAME = "kosium-shell-v1";

// Só cacheamos o "esqueleto" visual do app (não guarda dados de pacientes).
const SHELL_FILES = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

// Estratégia "network-first": sempre tenta buscar a versão mais nova online;
// só usa o cache se o dispositivo estiver sem internet.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
