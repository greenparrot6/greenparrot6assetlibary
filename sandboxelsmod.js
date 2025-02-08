elements.algae_farm = {
    color: "#228B22",
    behavior: behaviors.STURDYPOWDER,
    category: "machines",
    tick: function(pixel) {
        if (pixel.temp > 0 && pixel.temp < 50) {
            if (Math.random() < 0.05) {
                createPixel("oxygen", pixel.x, pixel.y - 1);
                createPixel("biomass", pixel.x, pixel.y + 1);
            }
        }
    }
};

elements.oxygenator = {
    color: "#ADD8E6",
    behavior: behaviors.STURDYPOWDER,
    category: "machines",
    tick: function(pixel) {
        if (pixel.temp > 0) {
            if (Math.random() < 0.1) {
                createPixel("oxygen", pixel.x, pixel.y - 1);
                pixel.temp += 1;
            }
        }
    }
};

elements.water_recycler = {
    color: "#4682B4",
    behavior: behaviors.STURDYPOWDER,
    category: "machines",
    tick: function(pixel) {
        let adjacent = adjacentCoords(pixel.x, pixel.y);
        for (let i = 0; i < adjacent.length; i++) {
            let coord = adjacent[i];
            let otherPixel = pixelMap[coord[0]][coord[1]];
            if (otherPixel && otherPixel.element === "dirty_water") {
                changePixel(otherPixel, "water");
            }
        }
    }
};

elements.solar_panel = {
    color: "#FFD700",
    behavior: behaviors.STURDYPOWDER,
    category: "machines",
    tick: function(pixel) {
        if (isInSunlight(pixel.x, pixel.y)) {
            pixel.charge = (pixel.charge || 0) + 1;
        }
    }
};

elements.ice_processor = {
    color: "#00FFFF",
    behavior: behaviors.STURDYPOWDER,
    category: "machines",
    tick: function(pixel) {
        let below = pixelMap[pixel.x][pixel.y + 1];
        if (below && below.element === "ice") {
            changePixel(below, "water");
        }
    }
};

elements.cafeteria = {
    color: "#8B4513",
    behavior: behaviors.STURDYPOWDER,
    category: "machines",
    tick: function(pixel) {
        let adjacent = adjacentCoords(pixel.x, pixel.y);
        for (let i = 0; i < adjacent.length; i++) {
            let coord = adjacent[i];
            let otherPixel = pixelMap[coord[0]][coord[1]];
            if (otherPixel && otherPixel.element === "food") {
                changePixel(otherPixel, "meal");
            }
        }
    }
};

elements.nitrogen_generator = {
    color: "#808080",
    behavior: behaviors.STURDYPOWDER,
    category: "machines",
    tick: function(pixel) {
        if (Math.random() < 0.05) {
            createPixel("nitrogen", pixel.x, pixel.y - 1);
        }
    }
};
