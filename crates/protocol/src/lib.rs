use std::net::{IpAddr, Ipv4Addr};

use bevy::{
    app::{PluginGroup, PluginGroupBuilder},
    remote::{
        RemotePlugin,
        http::{Headers, RemoteHttpPlugin},
    },
};

#[derive(Debug)]
pub struct Graphics;

impl PluginGroup for Graphics {
    fn build(self) -> PluginGroupBuilder {
        let cors_headers = Headers::new()
            .insert("Access-Control-Allow-Origin", "*")
            .insert("Access-Control-Allow-Headers", "Content-Type");

        PluginGroupBuilder::start::<Graphics>()
            .add(RemotePlugin::default())
            .add(
                RemoteHttpPlugin::default()
                    .with_address(IpAddr::V4(Ipv4Addr::LOCALHOST))
                    .with_headers(cors_headers),
            )
    }
}

#[cfg(test)]
mod tests {

    use bevy::MinimalPlugins;

    use crate::Graphics;

    #[test]
    fn world() {
        bevy::app::App::new()
            .add_plugins(MinimalPlugins)
            .add_plugins(Graphics)
            .run();
    }
}
