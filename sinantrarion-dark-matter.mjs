const cusSkills = [{
  abbr: "dat",
  label: "Data",
  ability: "int",
  fullKey: "data"
}, 
{
  abbr: "pil",
  label: "Piloting",
  ability: "dex",
  fullKey: "piloting"
},
{
  abbr: "tec",
  label: "Technology",
  ability: "int",
  fullKey: "technology"
}];

Hooks.once("init", () => {

  // Custom skills
  cusSkills.forEach(skl => {
    CONFIG.DND5E.skills[skl.abbr] = {
      label: skl.label,
      ability: skl.ability,
      fullKey: skl.fullKey
    }
  });

  SetupWeapons();
  SetupArmors();
  SetupTools();
  SetupLanguages();

  SetupExtra();
});

Hooks.once("setup", () => {
  setupDaeFields();
});

function SetupWeapons() {
  CONFIG.DND5E.weaponProficiencies["simb"] = "Simple Blasters";
  CONFIG.DND5E.weaponProficiencies["marb"] = "Martial Blasters";

  CONFIG.DND5E.weaponProficienciesMap["simpleB"] = "simb";
  CONFIG.DND5E.weaponProficienciesMap["martialB"] = "marb";

  CONFIG.DND5E.weaponTypes["simpleB"] = "Simple Blasters";
  CONFIG.DND5E.weaponTypes["martialB"] = "Martial Blasters";

  CONFIG.DND5E.weaponProperties["automatic"] = "Automatic";
  CONFIG.DND5E.weaponProperties["blaster"] = "Blaster";
  CONFIG.DND5E.weaponProperties["explosive"] = "Explosive";
  CONFIG.DND5E.weaponProperties["foregrip"] = "Foregrip";
  CONFIG.DND5E.weaponProperties["fist"] = "Fist";
  CONFIG.DND5E.weaponProperties["heat"] = "Heat";
  CONFIG.DND5E.weaponProperties["nonlethal"] = "Nonlethal";
  CONFIG.DND5E.weaponProperties["overheat"] = "Overheat";
  CONFIG.DND5E.weaponProperties["scatter"] = "Scatter";
  CONFIG.DND5E.weaponProperties["sighted"] = "Sighted";
  CONFIG.DND5E.weaponProperties["mounted"] = "Mounted";

  var weapons = [
    {abbr: "sunstaff", id: "P0zs0GGWKJ0v1K3O"},
    {abbr: "ioncannon", id: "Me6GjvNtXeFl6O09"},
    {abbr: "phaser", id: "MyFoKpbBP2q2qNwf"},
    {abbr: "repeater", id: "IEOzR0UUDX2mVk97"},
    {abbr: "standardcarb", id: "BFnOvLLioJlJVg1u"},
    {abbr: "swarmpistol", id: "GGDc0Q6bMnNaIIaZ"},

    {abbr: "antimattercarb", id: "lZI08spuGpahZEJc"},
    {abbr: "blitzcannon", id: "5BFgtg0TYQ3yRqmB"},
    {abbr: "concussionrifle", id: "5yc9YdbIUchJ36yM"},
    {abbr: "diodebeam", id: "O44sCwwXP9gD9lUb"},
    {abbr: "magnus", id: "PsK1MhkvbfCGBjbb"},
    {abbr: "plasmalauncher", id: "TGRBYOqynAAz9uao"},
    {abbr: "psionichelm", id: "lr6P1YueGnD2R90D"},
    {abbr: "recgun", id: "tTAUf0tPVS2rYzX0"},
    {abbr: "singularity", id: "w6Lkd9ZhefHJzj7R"},
    {abbr: "volcanic", id: "yKtsBur2JBx2ggO6"},
    
    {abbr: "laserclaws", id: "4MUbhNDTnhughhiS"},
    {abbr: "antidagger", id: "50qzh3GseS9bJCyq"},
    {abbr: "skawarclub", id: "INVMYdx54h5POgyb"},
    {abbr: "voidshackles", id: "KZLndcbqcepG8kXS"},
    {abbr: "ballisticgloves", id: "dsf30JqPyRwssciG"},
    
    {abbr: "battlefist", id: "3Z4R2SyU8Xeohl0l"},
    {abbr: "crystallinerod", id: "5TQCty2pPge5Sqem"},
    {abbr: "laserhalfsword", id: "6dTNTu5ynkQpVEpw"},
    {abbr: "lasersword", id: "8rQM0oT74xPI6azF"},
    {abbr: "photoniclash", id: "RUEDsYx89XmUro2L"},
    {abbr: "plasmacutter", id: "SbiDzF50pXJkOmRM"},
    {abbr: "repulsorgauntlet", id: "TRiFvDNnzLbIbTfm"},
    {abbr: "rockethammer", id: "VjfqsbO0hWlKFfwC"},
    {abbr: "thermallance", id: "YYFuIlhyemYdakLI"},
    {abbr: "arcbaton", id: "jgeoKutwqtVp9bco"},
    {abbr: "wrenchinator", id: "sMePn4OSoeQdmW8v"},
  ];

  weapons.forEach(weapon => {
    CONFIG.DND5E.weaponIds[weapon.abbr] = `sinantrarion-dark-matter.dark-matter-weapons-and-armors.${weapon.id}`;
  });
}

function SetupArmors() {
  CONFIG.DND5E.armorIds = [];

  var armors = [
    {abbr: "adamhardsuit", id: "IbQ0xED2hHufWyGy"},
    {abbr: "ferrofhardsuit", id: "oW5zBg9C7paBNFe1"},
    {abbr: "starshardsuit", id: "vBFbmg9a7zbJYWsH"},
    {abbr: "carbhardsuit", id: "iHW7OEaUrXktC4X7"},

    {abbr: "flightj", id: "J7sVKiOYpdn9c3rm"},
    {abbr: "nanofib", id: "l1ea4QsZZEWx92Pi"},
    {abbr: "tacticnanofib", id: "eqSokZJEMVwzxN1s"},

    {abbr: "carbonic", id: "EGxcTfwKjIjTpYa2"},
    {abbr: "environ", id: "A7XNrIpJVgrY28qh"},
    {abbr: "hexaplate", id: "5toryXnQ13hJCHXW"},
    {abbr: "monoplate", id: "F2aDPGS9fjTEWm81"},
    {abbr: "triplate", id: "2F4PFxIKq1pCXswS"},
  ]

  armors.forEach(armor => {
    CONFIG.DND5E.armorIds[armor.abbr] = `sinantrarion-dark-matter.dark-matter-weapons-and-armors.${armor.id}`;
  });
}

function SetupLanguages() {
  CONFIG.DND5E.languages.standard.children["amoeboid"] = "Amoeboid";
  CONFIG.DND5E.languages.standard.children["aviara"] = "Avia-Ra";
  CONFIG.DND5E.languages.standard.children["skathari"] = "Skathári";
  CONFIG.DND5E.languages.standard.children["wrothian"] = "Wrothian";

  delete CONFIG.DND5E.languages.exotic.children.aarakocra;
  delete CONFIG.DND5E.languages.exotic.children.gith;
  delete CONFIG.DND5E.languages.exotic.children.gnoll;
}

function SetupTools() {
  var tools = [
    {abbr: "circuitrykit", id: "PWOvhnCGqrXoGwSa"},
    {abbr: "mechanisttools", id: "TFrrRLUihsfSLJRH"},
    {abbr: "shipmaintools", id: "yK9uBD7bD58oIduu"}
  ]

  tools.forEach(tool => {
    CONFIG.DND5E.toolIds[tool.abbr] = `sinantrarion-dark-matter.dark-matter-weapons-and-armors.${tool.id}`;
  });
}

function SetupExtra() {
  CONFIG.DND5E.featureTypes.class.subtypes["gadget"] = "Gadget";
}

function setupDaeFields() {
  let daeflags = [];

  cusSkills.forEach(sk => {
    daeflags.push(`system.skills.${sk.abbr}.value`);
    daeflags.push(`system.skills.${sk.abbr}.ability`);
    daeflags.push(`system.skills.${sk.abbr}.bonuses.check`);
    daeflags.push(`system.skills.${sk.abbr}.bonuses.passive`);
  });

  if (game.modules.get("dae")?.active) {
    const initDAE = async () => {
      for (let i = 0; i < 100; i++) {
        if (globalThis.DAE) {
          globalThis.DAE.addAutoFields(daeflags);
          return true;
        }
        else {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      return false;
    };
    initDAE().then(value => {
      if (!value)
        console.error(`farmlands-and-cows | initDae settings failed`);
    });

  }
}
