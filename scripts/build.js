#!/usr/bin/env node

const path = require("path")
const fs = require("fs")
const puppeteer = require("puppeteer")
const mkdirp = require("mkdirp")

process.stdout.write("\u001Bc") // clear terminal
console.log("\x1b[36mWritting static files...\x1b[0m\n\n")

const config = require("./../src/config")
const routes = Object.values(config.routes)

const waitFor = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

const buildPath = path.join(__dirname, "../build")

mkdirp.sync(buildPath)

;(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // build for prod with webpack to have good assets

    // iterate over all routes
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        // for each fetch content
        await page.goto(`http://127.0.0.1:8081${route}`)
        const content = await page.content()

        // then create a folder in build with an index.html with content (carfeul with the asset urls)
        const folderPath = route === "/" ? "" : route
        if (folderPath) {
            mkdirp.sync(path.join(buildPath, folderPath))
        }

        const filePath = path.join(buildPath, folderPath, "index.html")

        fs.writeFileSync(filePath, content)
        console.log("  static page create: \x1b[35m", route, "\x1b[0m")
    }

    // then move to gh-pages branch, put all content there.
    // check with python server then push if good

    console.log("\n\n\x1b[36mDone.\x1b[0m")
    browser.close()
})()
