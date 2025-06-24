let
  pkgs = import <nixpkgs> { };
in
pkgs.mkShellNoCC {
  buildInputs = with pkgs; [ nodejs_24 ];
}
