use bevy_app::{PluginGroup, PluginGroupBuilder};
use bevy_remote::RemotePlugin;

#[derive(Debug)]
struct Graphics;

impl PluginGroup for Graphics {
    fn build(self) -> bevy_app::PluginGroupBuilder {
        PluginGroupBuilder::start::<Graphics>().add(RemotePlugin::default())
    }
}

#[cfg(test)]
mod tests {
    use bevy_ecs::world::World;

    use crate::Graphics;

    #[test]
    fn world() {
        bevy_app::App::new().add_plugins(Graphics).run();
    }
}
