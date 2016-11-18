//! Maths formats parsers and emitters.

#[cfg(feature = "mathml")]
pub mod mathml;

use std::io::{BufRead, Write};

use ast::Node;
use error::*;

pub trait Format {
  fn read<R>(read: &mut R) -> Result<Node>
  where R: BufRead;

  fn write<W>(node: &Node, write: &mut W) -> Result<()>
  where W: Write;
}
