package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/barelyhuman/go/env"
	"github.com/petaki/inertia-go"
)

//go:embed template/*.html
var templateFS embed.FS
var inertiaManager *inertia.Inertia

var PORT string
var HOST string

func main() {

	port := env.Get("PORT", "3000")
	host := env.Get("HOST", "")

	url := "http://localhost:3000"
	rootTemplate := "template/index.html"
	version := ""

	inertiaManager = inertia.NewWithFS(url, rootTemplate, version, templateFS)
	inertiaManager.EnableSsrWithDefault()

	inertiaManager.ShareFunc("asset", assetFunc)

	mux := http.NewServeMux()
	mux.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("public/build/assets"))))

	mux.Handle("/", inertiaManager.Middleware(http.HandlerFunc(homeHandler)))

	addr := fmt.Sprintf("%v:%v", host, port)

	log.Println("Starting on", addr)
	http.ListenAndServe(addr, mux)

}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	err := inertiaManager.Render(w, r, "Home", nil)
	if err != nil {
		log.Printf("Failed to render in homeHandler with error:%v", err)
		return
	}
}

func assetFunc(path string) string {
	manifestPath := "public/build/manifest.json"

	file, err := os.Open(manifestPath)
	if err != nil {
		log.Printf("Error opening manifest.json: %v", err)
		return ""
	}
	defer file.Close()

	var manifest map[string]struct {
		File string `json:"file"`
	}

	if err := json.NewDecoder(file).Decode(&manifest); err != nil {
		log.Printf("Error decoding manifest.json: %v", err)
		return ""
	}

	if entry, exists := manifest[path]; exists {
		return "/" + entry.File
	}

	log.Printf("Asset not found for path: %s", path)
	return ""
}
