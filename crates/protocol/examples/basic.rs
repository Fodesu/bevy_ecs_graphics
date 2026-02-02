use bevy::{
    camera_controller::free_camera::{FreeCamera, FreeCameraPlugin},
    prelude::*,
    remote::builtin_methods::export_registry_types,
};
use protocol::Graphics;

fn main() {
    bevy::app::App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(Graphics)
        .add_plugins(FreeCameraPlugin)
        .add_systems(Startup, setup)
        .run();
}

#[derive(Component)]
struct Cube(f32);

fn setup(
    mut command: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
) {
    // light
    command.spawn((
        PointLight {
            shadow_map_near_z: 50.0,
            ..default()
        },
        Transform::from_xyz(4.0, 8.0, 4.0),
    ));

    // camera
    command.spawn((
        Camera3d::default(),
        FreeCamera {
            run_speed: 10.0,
            ..default()
        },
        Transform::from_xyz(-2.5, 4.5, 9.0).looking_at(Vec3::ZERO, Vec3::Y),
    ));

    command.spawn((
        Mesh3d(meshes.add(Cuboid::new(1.0, 1.0, 1.0))),
        MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
        Transform::from_xyz(0.0, 0.5, 0.0),
        Cube(1.0),
    ));
}
