export function SetupArmors() {
  CONFIG.DND5E.armorIds = [];

  var armors = [
    { abbr: "adamhardsuit", id: "IbQ0xED2hHufWyGy" },
    { abbr: "ferrofhardsuit", id: "oW5zBg9C7paBNFe1" },
    { abbr: "starshardsuit", id: "vBFbmg9a7zbJYWsH" },
    { abbr: "carbhardsuit", id: "iHW7OEaUrXktC4X7" },

    { abbr: "flightj", id: "J7sVKiOYpdn9c3rm" },
    { abbr: "nanofib", id: "l1ea4QsZZEWx92Pi" },
    { abbr: "tacticnanofib", id: "eqSokZJEMVwzxN1s" },

    { abbr: "carbonic", id: "EGxcTfwKjIjTpYa2" },
    { abbr: "environ", id: "A7XNrIpJVgrY28qh" },
    { abbr: "hexaplate", id: "5toryXnQ13hJCHXW" },
    { abbr: "monoplate", id: "F2aDPGS9fjTEWm81" },
    { abbr: "triplate", id: "2F4PFxIKq1pCXswS" },
  ]

  armors.forEach(armor => {
    CONFIG.DND5E.armorIds[armor.abbr] = `sinantrarion-dark-matter.dark-matter-weapons-and-armors.${armor.id}`;
  });

  CONFIG.DND5E.miscEquipmentTypes['upgrade'] = "Vehicle Upgrade";
  CONFIG.DND5E.equipmentTypes['upgrade'] = "Vehicle Upgrade";

  var graftsEquipment = {
    internalGraft: "Internal Graft",
    externalGraft: "External Graft",
    headGraft: "Head Graft",
    armsGraft: "Arms Graft",
    legsGraft: "Legs Graft"
  }
  for (const [armor, name] of Object.entries(graftsEquipment)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = true;
  }

  var clothingArmor = {
    clothhat: "Clothings Helmet",
    clothpants: "Clothings Pants",
    clothhands: "Clothings Gloves",
    clothboots: "Clothings Boots"
  }

  for (const [armor, name] of Object.entries(clothingArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = true;
  }

  var lightArmor = {
    lighthat: "Light Helmet",
    lightpants: "Light Pants",
    lighthands: "Light Gloves",
    lightboots: "Light Boots"
  }

  for (const [armor, name] of Object.entries(lightArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'lgt';
  }

  var mediumArmor = {
    mediumhat: "Medium Helmet",
    mediumpants: "Medium Pants",
    mediumhands: "Medium Gloves",
    mediumboots: "Medium Boots"
  }

  for (const [armor, name] of Object.entries(mediumArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'med';
  }

  var heavyArmor = {
    heavyhat: "Heavy Helmet",
    heavypants: "Heavy Pants",
    heavyhands: "Heavy Gloves",
    heavyboots: "Heavy Boots"
  }

  for (const [armor, name] of Object.entries(heavyArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'hvy';
  }
}

export function SetupArmorChoice(html, data) {
  var toAddArray = [
    {
      label: "Helmet",
      values: {
        clothhat: "Clothings Helmet",
        lighthat: "Light Helmet",
        mediumhat: "Medium Helmet",
        heavyhat: "Heavy Helmet",
      }
    },
    {
      label: "Gloves",
      values: {
        clothhands: "Clothings Gloves",
        lighthands: "Light Gloves",
        mediumhands: "Medium Gloves",
        heavyhands: "Heavy Gloves",
      }
    },
    {
      label: "Pants",
      values: {
        clothpants: "Clothings Pants",
        lightpants: "Light Pants",
        mediumpants: "Medium Pants",
        heavypants: "Heavy Pants",
      }
    },
    {
      label: "Boots",
      values: {
        clothboots: "Clothings Boots",
        lightboots: "Light Boots",
        mediumboots: "Medium Boots",
        heavyboots: "Heavy Boots",
      }
    },
    {
      label: "Grafts",
      values: {
        internalGraft: "Internal Graft",
        externalGraft: "External Graft",
        headGraft: "Head Graft",
        armsGraft: "Arms Graft",
        legsGraft: "Legs Graft"
      }
    },
  ]

  var choiseList = html.find(".details").find('.form-group [name="system.type.value"]');
  toAddArray.forEach(element => {
    let choices = $(`<optgroup label="${element.label}"></optgroup>`);
    for (const [armor, name] of Object.entries(element.values)) {
      choices.append(`<option value="${armor}" ${data.system.type.value == armor ? 'selected' : ''}>${name}</option>`);
    }
    choiseList.append(choices);
  });
}