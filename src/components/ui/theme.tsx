  import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
    globalCss: {
        "body": {
            backgroundColor: "brand.500",
            fontFamily: "var(--chakra-fonts-mono)",
            fontWeight: "500",
            color: "brand.50",
        },
        "a.chakra-link:hover" : {
            color: "brand.highlight!important"
        },
        "a.chakra-link:focus": {
            color: "brand.highlight!important",
            outline: "none!important",
            boxShadow: "none!important",
            border: "none!important"
        },
        "a.active:hover": {
            color: "brand.mutedHighlight",
        },
        "a:hover": {
            // textDecoration: "underline",    
            color: "brand.highlight"
        },
        "*::selection": {
          bg: "green.200",
        },
    },
    theme: {
      tokens: {
        colors: {
          brand: {

            // GREY 

            50:  { value: "#d1d5db" }, // was 100 previously
            100: { value: "#9ca3af" }, // was 200 previously
            200: { value: "#6b7280" }, // was 300 previously
            300: { value: "#4b5563" }, // was 400 previously
            400: { value: "#374151" }, // was 500 previously
            500: { value: "#1f2937" }, // was 600 previously
            600: { value: "#111827" }, // was 700 previously
            700: { value: "#0f1115" }, // was 800 previously
            800: { value: "#090a0c" }, // was 900 previously
            900: { value: "#040506" }, // new darkest gray

            // GREEN

            // 50:  { value: "#FFFFFF"},
            // 100: { value: "#E8F1EA"},
            // 200: { value: "#C6DCCC"},
            // 300: { value: "#8DBA98"},
            // 400: { value: "#539665"},
            // 500: { value: "#1A7431"},
            // 600: { value: "#17682C"},
            // 700: { value: "#145725"},
            // 800: { value: "#0D3A19"},
            // 900: { value: "#071D0C"},

            // PURPLE 

            // 50: { value: "#FFFFFF" },
            // 100: { value: "#D5D3E5" },
            // 200: { value: "#AAA7CA" },
            // 300: { value: "#807BB0" },
            // 400: { value: "#554F95" },
            // 500: { value: "#2b237b" },
            // 600: { value: "#221C62" },
            // 700: { value: "#1A154A" },
            // 800: { value: "#110E31" },
            // 900: { value: "#090719" },
          },
        },
      },
      semanticTokens: {
        colors: {
          brand: {
            solid: { value: "{colors.brand.500}" },
            contrast: { value: "{colors.brand.100}" },
            fg: { value: "{colors.brand.700}" },
            muted: { value: "{colors.brand.100}" },
            subtle: { value: "{colors.brand.200}" },
            emphasized: { value: "{colors.brand.300}" },
            focusRing: { value: "{colors.brand.500}" },
            // highlight: { value: "#FFCC00"},
            highlight: { value: "#00cc00"},
            mutedHighlight: { value: "#E6BD1A"},
            alert: { value: "#FF4D4D"},
            alertMuted: { value: "#e64545"},
          },
        },
      },
      slotRecipes: {
        table: {
            slots: ["root", "row", "cell", "columnHeader"],
            base: {
                columnHeader: {
                    backgroundColor: "brand.100",
                    color: "brand.400",
                    borderColor: "brand.100",
                    fontWeight: "bold",
                    fontSize: "md",
                },
                cell: { 
                    backgroundColor: "brand.500",
                    borderColor: "brand.50",
                },
            },
        },
      },
      recipes: {
        heading: {
            base: {
                fontFamily: "var(--chakra-fonts-mono)",
            },
        },
        
        // tableRow: {
        //     base: {
        //         border: "1px solid",
        //         borderColor: "red",
        //         borderRadius: "md",
        //         backgroundColor: "red",
        //     },
        // },
        // tab
        // tableCell: {
        //     base: {
        //         border: "1px solid",
        //         borderColor: "red",
        //         borderRadius: "md",
        //         backgroundColor: "red",
        //     },
        // }
      }
    },
  })
  
  export const system = createSystem(defaultConfig, config)