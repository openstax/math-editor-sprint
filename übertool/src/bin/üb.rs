#![feature(non_ascii_idents)]

extern crate übertool;

use std::fs::File;
use std::io::BufReader;

use übertool::format::Format;
use übertool::format::mathml::MathML;

fn main() {
  let mut file = BufReader::new(File::open("./test.xml").unwrap());
  let tree = MathML::read(&mut file);
  println!("{:?}", tree);
}
