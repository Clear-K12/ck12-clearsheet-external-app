import prod from "./prod.json";
import dev from "./dev.json";
import { Config } from "./configuration";
var hostname = "";
if (typeof window !== 'undefined') {
    hostname = window && window.location && window.location.hostname;
}
let configuration: Config = new Config();
switch (hostname) {
    case "localhost":
        configuration = dev.configuration;
        break;
    case "kind-cliff-0a7d75210.2.azurestaticapps.net":
        configuration = prod.configuration;
        break;
    case "prodclcsexternalapp.z19.web.core.windows.net":
        configuration = prod.configuration;
        break;  
    case "wonderful-ocean-04a3d8110.2.azurestaticapps.net":
        configuration = dev.configuration;
        break; 
    default:
        configuration = dev.configuration;
}

export const Configuration = configuration;
