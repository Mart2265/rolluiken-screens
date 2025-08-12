# Rolluikenvoorjou — Clean Root

✅ Bevat `app/` in de **root** + `vercel-build` script.
Gebruik zo:
1) Upload **de inhoud van deze map** in de root van je GitHub-repo (dus `app/`, `package.json`, etc. in de bovenste laag).
2) Vercel → Project → Redeploy → **Clear build cache** aan.
3) Als je de fout krijgt "Couldn't find any `pages` or `app` directory", staat je root directory in Vercel verkeerd. Zet hem naar de map waar `package.json` en `app/` staan.
