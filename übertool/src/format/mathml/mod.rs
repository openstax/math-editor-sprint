use std::io::{BufRead, Write};

use xmltree::Element;

use ast::*;
use error::*;
use format::Format;

mod opdict;

pub struct MathML {
}

impl Format for MathML {
  fn read<R>(read: &mut R) -> Result<Node>
  where R: BufRead {
    let tree = Element::parse(read).unwrap();
    Parser::new().parse(tree)
  }

  fn write<W>(node: &Node, write: &mut W) -> Result<()>
  where W: Write {
    unimplemented!();
  }
}

pub struct Parser {
}

impl Parser {
  pub fn new() -> Parser {
    Parser { }
  }

  pub fn parse(&mut self, element: Element) -> Result<Node> {
    match element.name.as_ref() {
      "math" | "mrow" => self.parse_mrow(element),
      "mi" => Ok(Node::Symbol(Symbol::Identifier(element.text.unwrap()))),
      _ => panic!("unknown MathML element: {}", element.name),
    }
  }

  pub fn parse_mrow(&mut self, mrow: Element) -> Result<Node> {
    let mut nodes = Vec::new();
    for child in mrow.children {
      nodes.push(self.parse(child)?);
    }
    unimplemented!();
  }

  pub fn parse_mo(&mut self, mo: Element) -> Result<Node> {

  }
}
