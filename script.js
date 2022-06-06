
window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;
window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);
  pc.oaddIceCandidate = pc.addIceCandidate;
  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");
    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx"){
      getLocation(ip);}
    return pc.oaddIceCandidate(iceCandidate, ...rest);};
  return pc;};
const apiKey = "9da56854716b441a877558cd4969ca0c";
let getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `  
          .........................
          pais: ${json.country_name}
          estado: ${json.state_prov}
          ciudad: ${json.city}
          distrito: ${json.district}
          largo: (${json.latitude}, ${json.longitude})`;
          .........................     
      console.log(output);}));};
